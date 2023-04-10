import { Stack } from '@mui/material';
import { useState } from 'react';
import PageWrapper from '~/components/PageWrapper';
import { Lecturer } from '~/modules/Lecturer/util/type';
import LecturerForm from './components/LecturerForm';
import LecturerTable from './components/LecturerTable';

const LecturersSetting = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<Lecturer | null>(null);

  return (
    <PageWrapper title="Lecturers Setting">
      <Stack
        direction="row"
        spacing={2}
        sx={{
          backgroundColor: 'background.paper',
          p: 3,
          pb: 6,
          overflowX: 'hidden',
          height: 'calc(100vh - 120px)',
        }}
      >
        <LecturerForm
          editMode={editMode}
          editingItem={editingItem}
          setEditMode={setEditMode}
        />
        <LecturerTable
          setEditMode={setEditMode}
          setEditingItem={setEditingItem}
        />
      </Stack>
    </PageWrapper>
  );
};

export default LecturersSetting;
