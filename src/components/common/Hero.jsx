import Image from "next/image"

const images = {};

function importAll(r) {
  r.keys().forEach((key) => (images[key] = r(key)));
}

// Import all images in subdirectories of ./public/assets/images/
importAll(
  require.context("../../../public/assets/images", true, /\.(png|jpe?g|svg|webp)$/)
);

export default function Hero(props) {
  return (
    <Image src={images[`./${props.lien}`].default} alt={props.alt} fill className="hero" />
  )
}
