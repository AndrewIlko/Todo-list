import { useReducer, useRef, useState } from "react";

const ToDoList = () => {
  let listOfProjects = [
    {
      id: 1,
      name: "Home 🏠",
      toDoTasks: [],
      inProcessTasks: [],
      doneTasks: [],
    },
    {
      id: 2,
      name: "Work 💻",
      toDoTasks: [],
      inProcessTasks: [],
      doneTasks: [],
    },
    {
      id: 3,
      name: "Steam 💰",
      toDoTasks: [],
      inProcessTasks: [],
      doneTasks: [],
    },
  ];
  function MakeProject(name) {
    this.id = listOfProjects.length + 1;
    this.name = name;
    this.toDoTasks = [];
    this.inProcessTasks = [];
    this.doneTasks = [];
  }
  const [projectsList, setProjectsList] = useState(listOfProjects);
  const [selectedProject, setSelectedProject] = useState(listOfProjects[0]);

  const [addTaskForm, setAddTaskForm] = useState(false);

  const taskFormField = (state, action) => {
    switch (action.type) {
      case "titleText": {
        return { ...state, title: action.title };
      }
      case "taskText": {
        return { ...state, text: action.text };
      }
      case "clear": {
        return { title: "", text: "" };
      }
    }
  };
  const [taskInfo, setTaskInfo] = useReducer(taskFormField, {
    text: "",
    title: "",
  });
  const changeProject = (projectName) => {
    setSelectedProject(projectName);
  };
  const [projectNameField, setProjectNameField] = useState("");
  const [addProjectForm, setAddProjectForm] = useState(false);
  return (
    <>
      <div
        className="create-task__wrapper"
        style={
          addTaskForm
            ? { visibility: "visible", opacity: 1 }
            : { visibility: "hidden", opacity: 0 }
        }
      >
        <div className="create-task">
          <div className="create-task__title">New task 📝</div>
          <form
            className="create-task__form"
            onSubmit={(e) => {
              e.preventDefault();
              let obj = { ...selectedProject };
              obj.toDoTasks.push(taskInfo);
              setTaskInfo({ type: "clear" });
              setAddTaskForm(false);
            }}
          >
            <label htmlFor="create-task__title-input">Enter task title</label>
            <input
              className="create-task__title-input"
              type="text"
              required
              placeholder="Make dinner..."
              onChange={(e) => {
                setTaskInfo({ type: "titleText", title: e.target.value });
              }}
              value={taskInfo.title}
            />
            <label htmlFor="create-task__textarea">Enter task text</label>
            <textarea
              className="create-task__textarea"
              required
              placeholder="-Pasta with meat balls..."
              onChange={(e) => {
                setTaskInfo({ type: "taskText", text: e.target.value });
              }}
              value={taskInfo.text}
            ></textarea>
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
      <div className="todo-list__wrapper">
        <div className="todo-projects">
          <div className="todo-projects__list-title">Projects</div>
          <div className="todo-projects__list">
            {projectsList.map((el) => {
              return (
                <>
                  <div
                    key={el.id}
                    className="todo-projects__list-item"
                    onClick={() => {
                      changeProject(el);
                    }}
                    style={
                      selectedProject.name == el.name
                        ? { backgroundColor: "#fff" }
                        : { backgroundColor: "rgb(0,0,0,0.015)" }
                    }
                  >
                    <div className="todo-projects__project-info">
                      <div className="todo-projects__project-name">
                        {el.name}
                      </div>
                      <div className="todo-projects__project-tasks">
                        <div>
                          Tasks:{" "}
                          {el.inProcessTasks.length + el.toDoTasks.length}
                        </div>
                        <div>Active: {el.inProcessTasks.length}</div>
                        <div>Done: {el.doneTasks.length}</div>
                      </div>
                    </div>
                    <i className="material-icons open-project__arrow">
                      chevron_right
                    </i>
                  </div>
                </>
              );
            })}
            <div
              className="add-project__wrapper"
              style={addProjectForm ? { display: "flex" } : { display: "none" }}
            >
              <form
                className="add-projec__form"
                onSubmit={(e) => {
                  e.preventDefault();
                  let arr = [
                    ...projectsList,
                    new MakeProject(projectNameField),
                  ];
                  setProjectsList(arr);
                  setProjectNameField("");
                  setAddProjectForm(false);
                }}
              >
                <input
                  type="text"
                  placeholder="Title..."
                  onChange={(e) => {
                    setProjectNameField(e.target.value);
                  }}
                  value={projectNameField}
                />
                <button>Add</button>
              </form>
            </div>
            <div
              className="todo-projects__add-project"
              onClick={() => {
                setAddProjectForm(true);
              }}
            >
              <i className="material-icons">add</i>
              <h2>Add project</h2>
            </div>
          </div>
        </div>
        <div className="todo-list">
          <div className="todo-list__column">
            <div className="todo-list__title-block">
              <span className="todo-list__title">
                To do
                <div
                  style={{
                    backgroundColor: "red",
                  }}
                ></div>
              </span>
              <button
                className="add-task__btn"
                onClick={() => {
                  setAddTaskForm(true);
                }}
              >
                <i className="material-icons">add</i>
              </button>
            </div>
            <div className="todo-list__column-content">
              {selectedProject.toDoTasks.map((task) => {
                return (
                  <>
                    <div className="todo-list__task">
                      <h1 className="todo-list__task-title">{task.title}</h1>
                      <div className="todo-list__task-text">{task.text}</div>

                      <button
                        className="task-btn task-btn--red"
                        onClick={() => {
                          let obj = { ...selectedProject };
                          obj.inProcessTasks.push(task);
                          obj.toDoTasks = obj.toDoTasks.filter(
                            (el) => el != task
                          );
                          let arr = [...projectsList];
                          for (let i = 0; i < projectsList.length; i++) {
                            if (obj.name == arr[i].name) {
                              arr[i] = obj;
                            }
                          }
                          setProjectsList(arr);
                          setSelectedProject(obj);
                        }}
                      >
                        Take tusk
                      </button>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="todo-list__column">
            <div className="todo-list__title-block">
              <span className="todo-list__title">
                In process
                <div
                  style={{
                    backgroundColor: "orange",
                  }}
                ></div>
              </span>
            </div>
            <div className="todo-list__column-content">
              {selectedProject.inProcessTasks.map((task) => {
                return (
                  <>
                    <div className="todo-list__task">
                      <h1 className="todo-list__task-title">{task.title}</h1>
                      <div className="todo-list__task-text">{task.text}</div>
                      <button
                        className="task-btn task-btn--green"
                        onClick={() => {
                          let obj = { ...selectedProject };
                          obj.doneTasks.push(task);
                          obj.inProcessTasks = obj.inProcessTasks.filter(
                            (el) => el != task
                          );
                          let arr = [...projectsList];
                          for (let i = 0; i < projectsList.length; i++) {
                            if (obj.name == arr[i].name) {
                              arr[i] = obj;
                            }
                          }
                          setProjectsList(arr);
                          setSelectedProject(obj);
                        }}
                      >
                        Completed
                      </button>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="todo-list__column">
            <div className="todo-list__title-block">
              <span className="todo-list__title">
                Done
                <div
                  style={{
                    backgroundColor: "green",
                  }}
                ></div>
              </span>
            </div>
            <div className="todo-list__column-content">
              {selectedProject.doneTasks.map((task) => {
                return (
                  <>
                    <div className="todo-list__task todo-list__task--done">
                      <h1 className="todo-list__task-title">{task.title}</h1>
                      <div className="todo-list__task-text">{task.text}</div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDoList;
