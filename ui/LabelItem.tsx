import { TinyColor } from '@ctrl/tinycolor';
import { Chip } from '@mui/joy';

export default function LabelItem({
  label,
  color,
}: {
  label: string;
  color: string;
}) {
  const Color = new TinyColor(color);
  const isLight = Color.isLight();

  return (
    <Chip
      style={{
        backgroundColor: color,
        color: isLight ? 'black' : 'white',
      }}
    >
      {label}
    </Chip>
  );
}
