import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import PageWrapper from '~/components/PageWrapper';
import { getSubjects } from '~/services/subject';
import SubjectForm from './components/SubjectForm';
import SubjectTable from './components/SubjectTable';
import { Subject } from './util/type';

const SubjectsSetting = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<Subject | null>(null);

  useEffect(() => {
    getSubjects().then((res) => {
      if (res.data) {
        setSubjects(res.data);
      }
    });
  }, []);

  return (
    <PageWrapper title="Subjects Setting">
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
        <SubjectForm
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
