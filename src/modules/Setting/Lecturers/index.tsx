import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import PageWrapper from '~/components/PageWrapper';
import { Lecturer } from '~/modules/Lecturer/util/type';
import LecturerForm from './components/LecturerForm';
import LecturerTable from './components/LecturerTable';
import useRefresh from '~/hooks/useRefresh';
import { Semester } from '~/modules/Semester/util/type';
import { getLecturers } from '~/services/lecturer';
import useAuth from '~/hooks/useAuth';

const LecturersSetting = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<Lecturer | null>(null);
  const [refresh, refetch] = useRefresh();
  const { user } = useAuth();
  const [semestersSelector, setSemestersSelector] = useState<Semester | null>(
    null
  );
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);

  useEffect(() => {
    if (semestersSelector && user) {
      getLecturers({
        lecturerId: null,
        subjectId: null,
        timeSlotId: null,
        semesterId: semestersSelector?.id || 0,
        departmentHeadId: user?.id || 0,
      }).then((res) => {
        if (res.data) {
          setLecturers(res.data);
        }
      });
    }
  }, [semestersSelector, refresh, user]);

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
          editMode={editMode}
          editingItem={editingItem}
          setEditMode={setEditMode}
        />
        <LecturerTable
          refetch={refetch}
          semestersSelector={semestersSelector}
          setSemestersSelector={setSemestersSelector}
          lecturers={lecturers}
          setEditMode={setEditMode}
          setEditingItem={setEditingItem}
        />
      </Stack>
    </PageWrapper>
  );
};

export default LecturersSetting;
