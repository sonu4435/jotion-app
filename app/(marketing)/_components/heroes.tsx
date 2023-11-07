import Image from "next/image";
import React from "react";
import docImg from '../../../public/documents.png'
import DarkdocImg from '../../../public/documents-dark.png'
import docImg2 from '../../../public/reading.png'
import DarkdocImg2 from '../../../public/reading-dark.png'
const Heroes = () => {
  return (
    <div className="flex flex-col item-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
          <Image
            src={docImg}
            fill
            alt="documents"
            className="object-contain dark:hidden pointer-events-none select-none"
          />
          <Image
            src={DarkdocImg}
            fill
            alt="documents"
            className="object-contain hidden dark:block pointer-events-none select-none"
          />
        </div>
        <div className="relative h-[400px] hidden w-[400px] md:block">
          <Image
            src={docImg2}
            fill
            className="object-contain dark:hidden pointer-events-none select-none"
            alt="Document"
          />
          <Image
            src={DarkdocImg2}
            fill
            className="object-contain hidden dark:block pointer-events-none select-none"
            alt="Document"
          />
        </div>
      </div>
    </div>
  );
};

export default Heroes;
