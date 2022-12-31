import Image from "next/image";
import React from "react";
import ros from "../public/images/ros.png";

function NoFile(props) {
  return (
    <section className="relative py-20 2xl:py-40 bg-gray-800 overflow-hidden">
      <div className="relative container px-4 mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="max-w-xl">
            <a
              className="inline-block text-white text-xl font-bold"
              href="#"
            ></a>
            <h2 className="mt-12 mb-14 text-5xl font-bold font-heading text-white">
              BattleScribe, but for the age of heresy.
            </h2>
            <p className="mb-8 text-xl text-gray-200">
              This only works for uncompressed ros files - save your
              battlescribe roster as one!
            </p>
            <Image src={ros} alt="ros" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default NoFile;
