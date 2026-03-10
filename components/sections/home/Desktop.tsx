import Image from "next/image";
import { memo } from "react";
import { motion } from "framer-motion";

function Desktop({ ...props }) {
  return (
    <>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        id="Desktop"
        className={``}
      >
        <Image
          src="/images/home/desktop.png"
          alt="Manulife Quiz"
          className={`h-screen w-screen object-cover`}
          width={0}
          height={0}
          sizes="100vw"
        />
      </motion.div>
    </>
  );
}

export default memo(Desktop);
