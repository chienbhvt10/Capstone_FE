import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import PageWrapper from '~/components/PageWrapper';
import { getSubjects } from '~/services/subject';
import SubjectForm from './components/SubjectForm';
import SubjectTable from './components/SubjectTable';
import { Subject } from './util/type';
import useRefresh from '~/hooks/useRefresh';

const SubjectsSetting = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<Subject | null>(null);
  const [refresh, refetch] = useRefresh();

  useEffect(() => {
    getSubjects().then((res) => {
      if (res.data) {
        setSubjects(res.data);
      }
    });
  }, [refresh]);

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
          refresh={refresh}
          refetch={refetch}
          subjects={subjects}
          setSubjects={setSubjects}
          editMode={editMode}
          editingItem={editingItem}
          setEditMode={setEditMode}
        />
        <SubjectTable
          subjects={subjects}
          setSubjects={setSubjects}
          setEditMode={setEditMode}
          setEditingItem={setEditingItem}
        />
      </Stack>
    </PageWrapper>
  );
};

export default SubjectsSetting;
