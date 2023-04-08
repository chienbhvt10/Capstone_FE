import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import PageWrapper from '~/components/PageWrapper';
import { Lecturer } from '~/modules/Lecturer/util/type';
import { getLecturers } from '~/services/lecturer';
import LecturerForm from './components/LecturerForm';
import LecturerTable from './components/LecturerTable';
import useRefresh from '~/hooks/useRefresh';

const LecturersSetting = () => {
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<Lecturer | null>(null);
  const [refresh, refetch] = useRefresh();

  useEffect(() => {
    getLecturers().then((res) => {
      if (res.data) {
        setLecturers(res.data);
      }
    });
  }, [refresh]);

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
          refetch={refetch}
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
