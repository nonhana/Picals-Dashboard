'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box } from '@mui/joy';
import Image from 'next/image';
import * as React from 'react';
import PreviewModal from '../PreviewModal';

export default function DraggableImg({
  id,
  src,
  onDelete,
}: {
  id: string;
  src: string;
  onDelete: (url: string) => void;
}) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id,
      transition: {
        duration: 500,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
    });
  const styles = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Box
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={styles}
        sx={{
          width: '120px',
          height: '120px',
          borderRadius: '4px',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        <Image
          src={src}
          alt={src}
          width={120}
          height={120}
          onClick={() => setVisible(true)}
        />
      </Box>
      <PreviewModal
        visible={visible}
        setVisible={setVisible}
        src={src}
        handleDel={onDelete}
      />
    </>
  );
}
