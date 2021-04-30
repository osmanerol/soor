import GeneralStore from './general/store/generalStore';
import InstructorStore from './instructor/store/instructorStore';
import StudentStore from './student/store/studentStore';
import UserStore from './user/store/userStore';
import LectureStore from './lecture/store/lectureStore';
import CommentStore from './comment/store/commentStore';

const store = { InstructorStore, UserStore, LectureStore, GeneralStore, CommentStore, StudentStore };

export default store;