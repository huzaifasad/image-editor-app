import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
import Sketch from "./Sketch";
import Editor from "./Editor";
import Client from "./Client";
   
  export function TabsCustomAnimation() {
    const data = [
      {
        label: "Image to Sketch",
        value: "html",
        desc: <Editor desc="Svelte content goes here" />,
      },
      {
        label: "Direct Sketch Modification",
        value: "react",
        desc: <Client desc="Svelte content goes here" />,
      },
   
     
    ];
   
    return (
      <Tabs id="custom-animation" value="html">
        <TabsHeader>
          {data.map(({ label, value }) => (
            <Tab key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody
          animate={{
            initial: { y: 250 },
            mount: { y: 0 },
            unmount: { y: 250 },
          }}
        >
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    );
  }