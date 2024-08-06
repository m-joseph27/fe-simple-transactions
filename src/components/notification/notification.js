// notificationUtils.js
import { notification } from 'antd';

const NotificationComponent = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
  });
};

export default NotificationComponent;