import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import PageWrapper from '~/components/PageWrapper';
import { getSubjects } from '~/services/subject';
import SubjectForm from './components/SubjectForm';
import SubjectTable from './components/SubjectTable';
import { Subject } from './util/type';
import useRefresh from '~/hooks/useRefresh';
import { Semester } from '~/modules/Semester/util/type';
import useAuth from '~/hooks/useAuth';

const SubjectsSetting = () => {
  const { user } = useAuth();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<Subject | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [refresh, refetch] = useRefresh();
  const [semestersSelector, setSemestersSelector] = useState<Semester | null>(
    null
  );

  useEffect(() => {
    if (semestersSelector) {
      getSubjects({
        semesterId: semestersSelector?.id || null,
        departmentHeadId: user?.id || null,
      }).then((res) => {
        if (res.data) {
          setSubjects(res.data);
        }
      });
    }
  }, [semestersSelector, refresh]);
  return (
    <PageWrapper title="Subjects Setting">
      <Stack
        direction="row"
        spacing={2}
        sx={{
          backgroundColor: 'background.paper',
          p: 3,
          pb: 6,
          overflowX: 'hidden',
          alignItems: 'flex-start',
          height: 'calc(100vh - 120px)',
        }}
      >
        <SubjectForm
          editMode={editMode}
          editingItem={editingItem}
          setEditMode={setEditMode}
          refetch={refetch}
        />
        <SubjectTable
          refetch={refetch}
          semestersSelector={semestersSelector}
          subjects={subjects}
          setEditMode={setEditMode}
          setEditingItem={setEditingItem}
          setSemestersSelector={setSemestersSelector}
        />
      </Stack>
    </PageWrapper>
  );
};

export default SubjectsSetting;
