import { ArchiveBoxArrowDownIcon } from '@heroicons/react/24/outline';
import { Modal, Tooltip } from '@hey/ui';
import { motion } from 'framer-motion';
import { type FC, useState } from 'react';

import List from './List';
import type { EditorRef } from '@components/Composer/TextEditor';

const DraftSettings: FC<{editorRef: EditorRef}> = ({editorRef}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Tooltip content="Drafts" placement="top">
        <motion.button
          aria-label="Drafts"
          className="rounded-full outline-offset-8"
          onClick={() => setShowModal(true)}
          type="button"
          whileTap={{ scale: 0.9 }}
        >
          <ArchiveBoxArrowDownIcon className="size-5" />
        </motion.button>
      </Tooltip>
      <Modal
        icon={<ArchiveBoxArrowDownIcon className="size-5" />}
        onClose={() => setShowModal(false)}
        show={showModal}
        size="md"
        title="Drafts"
      >
        <List setShowModal={setShowModal} editorRef={editorRef}/>
      </Modal>
    </>
  );
};

export default DraftSettings;
