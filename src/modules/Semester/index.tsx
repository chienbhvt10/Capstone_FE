import { Stack } from '@mui/material';
import { useState } from 'react';
import PageWrapper from '~/components/PageWrapper';
import SemesterForm from './components/SemesterForm';
import SemesterTable from './components/SemesterTable';
import { Semester } from './util/type';

const SemesterSetting = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<Semester | null>(null);

  return (
    <PageWrapper title="Semester Setting">
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
        <SemesterForm
          editMode={editMode}
          editingItem={editingItem}
          setEditMode={setEditMode}
        />
        <SemesterTable
          setEditMode={setEditMode}
          setEditingItem={setEditingItem}
        />
      </Stack>
    </PageWrapper>
  );
};

export default SemesterSetting;
