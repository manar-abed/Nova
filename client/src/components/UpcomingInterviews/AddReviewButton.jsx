import React, { useState } from 'react';
import { Modal, Button, Input } from 'antd';

const { TextArea } = Input;

const AddReviewButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [review, setReview] = useState('');

  const onChange = (e) => {
    setReview(e.target.value);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    // Here we can send the review to the backend
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button className="addReview" type="primary" onClick={showModal}>
        Add review
      </Button>
      <Modal
        title="Review"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <TextArea value={review} placeholder="Add your review here." style={{ height: 100 }} onChange={onChange} />
      </Modal>
    </>
  );
};

export default AddReviewButton;
