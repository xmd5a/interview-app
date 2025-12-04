import classes from './Image.module.scss';

interface ImageProps {
  src: string;
}

export const Image: React.FC<ImageProps> = ({ src }) => {
  return (
    <img
      src={src}
      alt=""
      data-testid={`image-${src}`}
      className={classes.image}
    />
  );
};
