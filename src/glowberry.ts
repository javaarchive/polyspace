
import fetch from "node-fetch"; // TODO: do I want to use cross-fetch here?
import crypto from "crypto";
import { SignJWT } from "jose";
import type { init } from "astro/virtual-modules/prefetch.js";

const fetchAlias = fetch;

export class GlowberryClient {

    base_url: string;
    secret: string;
    shared_auth_secret: string = "";

    constructor(base_url: string, secret: string) {
        this.base_url = base_url;
        this.secret = secret;
    }

    getAuthHeaders(){
        return {
            "Authorization": `Bearer ${this.secret}`
        }
    }

    fetch(method: string, path: string, body: any): Promise<Response> {
        const url = `${this.base_url}${path}`;
        return (fetchAlias(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                ...this.getAuthHeaders()
            },
            body: JSON.stringify(body)
        })) as any as Promise<Response>; // fuck you typescript
    }

    async request(method: string, path: string, body: any): Promise<Response> {
        const resp = await this.fetch(method, path, body);
        if(resp.ok){ 
            return resp;
        }else{
            throw new Error("Request failed: " + resp.status + " " + resp.statusText + " " + (await resp.text()));
        }
    }

    async request_json(method: string, path: string, body: any): Promise<any> {
        const resp = await this.request(method, path, body);
        if(!resp.headers.get("Content-Type").includes("application/json")){
            console.warn("Response does not have application/json content type for " + method + " " + path);
        }
        return (await resp.json());
    }

    async validateSharedSecret(shared_auth_secret_to_check: string) {
        const challenge = crypto.randomBytes(32).toString("hex");
        const hmac = crypto.createHmac("sha256", shared_auth_secret_to_check);
        hmac.update(challenge);

        try{
            const data = await this.request_json("POST", "/validate_shared_secret", {
                challenge,
                signature: hmac.digest("hex")
            });
            return data["ok"] || false;
        }catch(ex){
            return false;
        }
    }

    async signWithSharedSecret(shared_auth_secret: string, data: any, test: boolean = false): Promise<string> {
        const jwt = (await new SignJWT(data)).setSubject(data["id"] || "unknown").setProtectedHeader({
            alg: "HS256",
        }).setAudience(test ? "polyspace:test": "polyspace:auth").setIssuer(import.meta.env.SITE_ID || "Polyspace Instance").sign(new TextEncoder().encode(shared_auth_secret));
        return jwt;
    }

    async check_user(user_details: any): Promise<any> {
        const token = await this.signWithSharedSecret(this.shared_auth_secret, user_details, true);
        return await this.request_json("POST", "/check_user", {
            token,
            user: user_details
        });
    }

    async getUserClient(user: any): Promise<GlowberryUserClient> {
        return (await GlowberryUserClient.getUserClient(this, user));
    }
}

export class GlowberryUserClient extends GlowberryClient {

    user: any;
    jwt: string;

    constructor(parent: GlowberryClient, user: any) {
        super(parent.base_url, parent.secret);
        this.shared_auth_secret = parent.shared_auth_secret;
        this.user = user;
    }

    async init(){
        this.jwt = await this.signWithSharedSecret(this.shared_auth_secret, this.user);
    }

    static async getUserClient(parent: GlowberryClient, user: any): Promise<GlowberryUserClient> {
        const client = new GlowberryUserClient(parent, user);
        await client.init();
        return client;
    }

    getAuthHeaders(): { Authorization: string; } {
        let headers = super.getAuthHeaders();
        headers["Authorization"] = `User ${this.jwt}`;
        return headers;
    }
}