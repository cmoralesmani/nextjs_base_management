// src/components/elements/ButtonDeleteConfirm.jsx

import PropTypes from "prop-types";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { BsXCircleFill } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";

import { Button } from "src/components/miscellaneous";

export { ButtonDeleteConfirm };

ButtonDeleteConfirm.propTypes = {
  message: PropTypes.string.isRequired,
  callbackDelete: PropTypes.func.isRequired,
};

function ButtonDeleteConfirm({ message, callbackDelete }) {
  /**
   * El mensaje es un texto que se va a mostrar en el cuerpo
   * del modal.
   * El callbackDelete debe retornar una promesa para que este
   * componente sepa cuando termina la eliminacion, para que
   * el boton de eliminar se mantenga bloqueado mientras ejecuta
   * la eliminacion.
   */
  const [show, setShow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const onClickDelete = async () => {
    setShow(false);
    setIsSubmitting(true);
    await callbackDelete();
    setIsSubmitting(false);
    return;
  };

  return (
    <>
      <Button
        variant="danger"
        className="p-0 m-0"
        onClick={handleShow}
        isSubmitting={isSubmitting}
        size="sm"
        icon={<FaRegTrashAlt />}
      />

      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title>
            <FaRegTrashAlt className="me-1" /> Confirmación de eliminación
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleClose}
            size="sm"
            icon={<BsXCircleFill className="me-1" />}
          >
            Cancelar
          </Button>
          <Button
            className="me-1"
            variant="danger"
            type="submit"
            onClick={onClickDelete}
            size="sm"
            icon={<FaRegTrashAlt className="me-1" />}
          >
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
