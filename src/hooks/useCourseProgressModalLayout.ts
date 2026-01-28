export const useCourseProgressModalLayout = () => {
  const modal = document.getElementById("course-progress-modal");

  const hideModal = () => {
    if (modal) {
      modal.classList.add("modal-hidden");
    }
  };

  const showModal = () => {
    if (modal) {
      modal.classList.remove("modal-hidden");
    }
  };

  return [showModal, hideModal];
};
