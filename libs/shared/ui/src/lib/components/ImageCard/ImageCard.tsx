import classes from './ImageCard.module.scss';

import { Image } from '../Image';

interface ImageCardProps {
  url: string;
  votes: number;
  onVote: (url: string, increment: number) => void;
  disabledButton: boolean;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  url,
  votes,
  onVote,
  disabledButton,
}) => (
  <div className={classes.imageCard}>
    <Image src={url} />
    <div>
      <button disabled={disabledButton} onClick={() => onVote(url, 1)}>
        +
      </button>
      <span data-testid={`voteCounter-${url}`} style={{ margin: '0 10px' }}>
        {votes}
      </span>
      <button disabled={disabledButton} onClick={() => onVote(url, -1)}>
        -
      </button>
    </div>
  </div>
);
