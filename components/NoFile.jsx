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

            {/* <a
            class="inline-block px-12 py-4 text-lg bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition duration-200"
            href="#"
          >
            Start again
          </a> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default NoFile;
