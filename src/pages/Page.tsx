import { type ReactNode } from "react";
import "./Page.css";

type PageProps = {
    name: string,
    children: ReactNode,
};

const Page = (props: PageProps) => {
    return (
        <div id={props.name} className="page">
            {props.children}
        </div>
    );
};

export default Page;
