// Assets imports
import rectangle1 from "../assets/Rectangle1.svg";
import rectangle2 from "../assets/Rectangle2.svg";
import rectangle3 from "../assets/Rectangle3.svg";
import rectangle4 from "../assets/Rectangle4.svg";
import rectangle5 from "../assets/Rectangle5.svg";
import rectangle6 from "../assets/Rectangle6.svg";
const GALLERY_IMAGES = [
  rectangle1,
  rectangle2,
  rectangle3,
  rectangle4,
  rectangle5,
  rectangle6,
];
export const ImageGallery = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-0">
    {GALLERY_IMAGES.map((image, index) => (
      <img
        key={index}
        src={image}
        alt={`Gallery image ${index + 1}`}
        className="w-full"
      />
    ))}
  </div>
);
