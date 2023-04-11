import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const images = {};

function importAll(r) {
  r.keys().forEach((key) => (images[key] = r(key)));
}

// Import all images in subdirectories of ./public/assets/images/
importAll(
  require.context(
    "../../../public/assets/images",
    true,
    /\.(png|jpe?g|svg|webp)$/
  )
);

export default function PreviewBody(props) {
  const router = useRouter();

  return (props.dataTypeDeCorps.bodies === undefined ?  props.dataTypeDeCorps :  props.dataTypeDeCorps.bodies).flatMap((type) => (
    <Link
      key={type.id}
      href={
        router.asPath +
        (router.asPath === "/lunes"
          ? "/" + type.aroundPlanet.planet + "/"
          : "/") +
        type.id
      }
      className="group"
    >
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 border">
        <Image
          src={
            images[`./${props.lienTypeDeCorps}/${type.id}.jpg`] ||
            images[`./${props.lienTypeDeCorps}/${type.id}.jpeg`] ||
            images[`./${props.lienTypeDeCorps}/${type.id}.png`] ||
            images[`./${props.lienTypeDeCorps}/${type.id}.svg`] ||
            images[`./${props.lienTypeDeCorps}/${type.id}.webp`]
          }
          alt={type.id}
          id={type.id}
          className="image-planete h-full w-full object-cover object-center group-hover:opacity-95 border-gray-500"
        />
      </div>
      <h3 className="mt-4 text-white text-xl">{type.name}</h3>
    </Link>
  ));
}
