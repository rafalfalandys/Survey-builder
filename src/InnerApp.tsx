import { useEffect } from "react";

type InnerAppProps = {
  html: string;
  css: string;
  js: string;
};

const InnerApp: React.FC<InnerAppProps> = ({ html, css, js }) => {
  useEffect(() => {
    // Insert any JavaScript you need to run here
    const script = document.createElement("script");
    script.innerHTML = js;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
           ${html}
            <style>
            ${css}
          </style>
        `,
      }}
    />
  );
};

export default InnerApp;
