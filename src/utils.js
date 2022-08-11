const request = ({ endpoint, method, data }) => {
  fetch(endpoint, {
    body: JSON.stringify(data),
    method,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const add = (data) => {
  request({
    endpoint: "http://localhost:3000/tasks",
    method: "POST",
    data,
  });
};

export const update = (task) => {
  request({
    endpoint: `http://localhost:3000/pages/${task.id}`,
    method: "PUT",
    data: task,
  });
};

export const remove = () => {
  request({
    endpoint: `http://localhost:3000/tasks/${task.id}`,
    method: "DELETE",
  });
};
