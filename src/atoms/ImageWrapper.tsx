import Image, { StaticImageData } from "next/image";

interface ImageWrapperProps {
  src: string | StaticImageData;
  alt: string;
  imageSize: string;
  sizes?: string;
  className?: string;
}

const ImageWrapper = ({
  src,
  alt,
  imageSize,
  sizes = "(max-width:768px)90vw,50vw",
  className = "",
}: ImageWrapperProps) => {
  return (
    <div className={`${imageSize} relative`}>
      <Image
        src={src}
        alt={alt}
        className={`${className}`}
        sizes={`${sizes}`}
        fill
      />
    </div>
  );
};

export default ImageWrapper;
