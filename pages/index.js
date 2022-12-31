import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Header from "../components/Header";
import NoFile from "../components/NoFile";
import UnitCard from "../components/UnitCard";
import { prepXML, unarchive } from "../utils/xml2";

export default function Home() {
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [forceJSON, setForceJSON] = useState();
  const [printMode, setPrintMode] = useState(false);

  const togglePrintMode = () => {
    setPrintMode(!printMode);
  };

  const changeHandler = (event) => {
    setIsFilePicked(false);
    let filename = event.target.files[0].name;

    let fileExtension = filename.split(".").pop().toLowerCase();

    if (fileExtension === "rosz") {
      unarchive(event.target.files[0], (data) => {
        prepXML(data, (res) => {
          setForceJSON(res);
          setIsFilePicked(true);
        });
      });
    } else {
      var reader = new FileReader();
      reader.addEventListener("loadend", function () {
        prepXML(reader.result, (data) => {
          setForceJSON(data);
          setIsFilePicked(true);
        });
      });
      reader.readAsText(event.target.files[0]);
    }
  };

  return (
    <div className="">
      <Head className="">
        <title>HeresyScribe</title>
        <meta
          name="description"
          content="Format your Battlescribe rosters for HH 2.0"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Header
          changeHandler={changeHandler}
          isFilePicked={isFilePicked}
          togglePrintMode={togglePrintMode}
        ></Header>

        <div>
          {isFilePicked ? (
            <>
              <div>
                {/* there are {forceJSON[0].units.length} */}
                {forceJSON[0].units.map((model, i) => {
                  model.checked = true;
                  return (
                    <UnitCard
                      model={model}
                      key={i}
                      checked={true}
                      printMode={printMode}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <NoFile />
          )}
        </div>
      </div>
    </div>
  );
}
