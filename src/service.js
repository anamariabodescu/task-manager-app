const URL = "http://localhost:8000/tasks";

export const getTasksList = () => {
  return fetch(URL).then((response) => response.json());
};

export const createTask = (task) => {
  return fetch(URL, {
    body: JSON.stringify(task),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateTask = (task) => {
  return fetch(`${URL}/${task.id}`, {
    body: JSON.stringify(task),
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const removeTask = (taskId) => {
  return fetch(`${URL}/${taskId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
