import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Header from "../components/Header";
import NoFile from "../components/NoFile";
import UnitCard from "../components/UnitCard";
import styles from "../styles/Home.module.css";
import { prepXML } from "../utils/xml2";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [forceJSON, setForceJSON] = useState();

  const changeHandler = (event) => {
    console.log("handler");
    setSelectedFile(event.target.files[0]);

    // let blob = file.fileBlob;
    var reader = new FileReader();
    reader.addEventListener("loadend", function () {
      // console.log(reader.result); // will print out file content
      prepXML(reader.result, (data) => {
        setForceJSON(data);
        setIsFilePicked(true);
      });
    });
    reader.readAsText(event.target.files[0]);
  };

  return (
    <div className="">
      <Head>
        <title>HeresyScribe</title>
        <meta
          name="description"
          content="Format your Battlescribe rosters for HH 2.0"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header changeHandler={changeHandler}></Header>

      <div>
        {isFilePicked ? (
          <>
            <div>
              {forceJSON[0].units.map((model, i) => {
                return <UnitCard model={model} key={i} />;
              })}
            </div>
          </>
        ) : (
          <NoFile />
        )}
      </div>
    </div>
  );
}
