import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import PageWrapper from '~/components/PageWrapper';
import { Lecturer } from '~/modules/Lecturer/util/type';
import { getLecturers } from '~/services/lecturer';
import LecturerForm from './components/LecturerForm';
import LecturerTable from './components/LecturerTable';

const LecturersSetting = () => {
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<Lecturer | null>(null);

  useEffect(() => {
    getLecturers().then((res) => {
      if (res.data) {
        setLecturers(res.data);
      }
    });
  }, []);

  return (
    <PageWrapper title="Lecturers Setting">
      <Stack
        direction="column"
        spacing={2}
        sx={{
          backgroundColor: 'background.paper',
          p: 2,
          pb: 6,
          overflowX: 'hidden',
          alignItems: 'center',
          height: 'calc(100vh - 60px)',
        }}
      >
        <LecturerForm
          lecturers={lecturers}
          setLecturers={setLecturers}
          editMode={editMode}
          editingItem={editingItem}
          setEditMode={setEditMode}
        />
        <LecturerTable
          lecturers={lecturers}
          setLecturers={setLecturers}
          setEditMode={setEditMode}
          setEditingItem={setEditingItem}
        />
      </Stack>
    </PageWrapper>
  );
};

export default LecturersSetting;
