import { signIn } from "auth-astro/client";
import { Button } from "./ui/button";

interface Props {
    provider: string;
    children?: React.ReactNode;
}

export default function ProviderLoginButtonReact(props: Props) {
    return (
        <Button variant="default" onClick={() => {
            signIn(props.provider);
        }} className="w-full">{props.children}</Button>
    );
}

export {ProviderLoginButtonReact};