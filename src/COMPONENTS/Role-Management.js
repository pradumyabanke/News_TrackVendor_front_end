import React, { useState } from "react";
import "../CSS/Role-Management.scss";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

const RoleManagement = () => {
  let initialRoles = {
    role_name: "",
    status: "",
    department: {
      add: false,
      edit: true,
      view: false,
    },
    designation: {
      add: false,
      edit: false,
      view: false,
    },
    role: {
      add: false,
      edit: false,
      view: false,
    },
    main_menu: {
      add: false,
      edit: false,
      view: false,
    },
    subMenu_level_1: {
      add: false,
      edit: false,
      view: false,
    },
    subMenu_level_2: {
      add: false,
      edit: false,
      view: false,
    },
    create_user: {
      add: false,
      edit: false,
      view: false,
    },
    user_role_custom: {
      add: false,
      edit: false,
      view: false,
    },

    create_project: {
      add: false,
      edit: false,
      view: false,
    },
    create_job_task: {
      add: false,
      edit: false,
      view: false,
    },
    assign_task: {
      add: false,
      edit: false,
      view: false,
    },
  };

  const [roles, setRoles] = useState(initialRoles);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");

      if (roles[parent][child] === true) {
        setRoles({
          ...roles,
          [parent]: {
            ...roles[parent],
            [child]: false,
          },
        });
      } else {
        setRoles({
          ...roles,
          [parent]: {
            ...roles[parent],
            [child]: true,
          },
        });
      }
    } else {
      setRoles({
        ...roles,
        [name]: value,
      });
    }
  };
  console.log(roles);

  const handleParentChange = (e) => {
    let { name, checked } = e.target;

    if (name === "master.add") {
      setRoles({
        ...roles,
        department: {
          ...roles.department,
          add: checked,
        },
        designation: {
          ...roles.designation,
          add: checked,
        },
        role: {
          ...roles.role,
          add: checked,
        },
      });
    } else if (name === "master.edit") {
      setRoles({
        ...roles,
        department: {
          ...roles.department,
          edit: checked,
        },
        designation: {
          ...roles.designation,
          edit: checked,
        },
        role: {
          ...roles.role,
          edit: checked,
        },
      });
    } else if (name === "master.view") {
      setRoles({
        ...roles,
        department: {
          ...roles.department,
          view: checked,
        },
        designation: {
          ...roles.designation,
          view: checked,
        },
        role: {
          ...roles.role,
          view: checked,
        },
      });
    } else if (name === "menu.add") {
      setRoles({
        ...roles,
        main_menu: {
          ...roles.main_menu,
          add: checked,
        },
        subMenu_level_1: {
          ...roles.subMenu_level_1,
          add: checked,
        },
        subMenu_level_2: {
          ...roles.subMenu_level_2,
          add: checked,
        },
      });
    } else if (name === "menu.edit") {
      setRoles({
        ...roles,
        main_menu: {
          ...roles.main_menu,
          edit: checked,
        },
        subMenu_level_1: {
          ...roles.subMenu_level_1,
          edit: checked,
        },
        subMenu_level_2: {
          ...roles.subMenu_level_2,
          edit: checked,
        },
      });
    } else if (name === "menu.view") {
      setRoles({
        ...roles,
        main_menu: {
          ...roles.main_menu,
          view: checked,
        },
        subMenu_level_1: {
          ...roles.subMenu_level_1,
          view: checked,
        },
        subMenu_level_2: {
          ...roles.subMenu_level_2,
          view: checked,
        },
      });
    } else if (name === "user.add") {
      setRoles({
        ...roles,
        create_user: {
          ...roles.create_user,
          add: checked,
        },
        user_role_custom: {
          ...roles.user_role_custom,
          add: checked,
        },
      });
    } else if (name === "user.edit") {
      setRoles({
        ...roles,
        create_user: {
          ...roles.create_user,
          edit: checked,
        },
        user_role_custom: {
          ...roles.user_role_custom,
          edit: checked,
        },
      });
    } else if (name === "user.view") {
      setRoles({
        ...roles,
        create_user: {
          ...roles.create_user,
          view: checked,
        },
        user_role_custom: {
          ...roles.user_role_custom,
          view: checked,
        },
      });
    } else if (name === "project.add") {
      setRoles({
        ...roles,
        create_project: {
          ...roles.create_project,
          add: checked,
        },
        create_job_task: {
          ...roles.create_job_task,
          add: checked,
        },
        assign_task: {
          ...roles.assign_task,
          add: checked,
        },
      });
    } else if (name === "project.edit") {
      setRoles({
        ...roles,
        create_project: {
          ...roles.create_project,
          edit: checked,
        },
        create_job_task: {
          ...roles.create_job_task,
          edit: checked,
        },
        assign_task: {
          ...roles.assign_task,
          edit: checked,
        },
      });
    } else if (name === "project.view") {
      setRoles({
        ...roles,
        create_project: {
          ...roles.create_project,
          view: checked,
        },
        create_job_task: {
          ...roles.create_job_task,
          view: checked,
        },
        assign_task: {
          ...roles.assign_task,
          view: checked,
        },
      });
    }
  };

  return (
    <div className="RoleManagement">
      <h5>Role Management</h5>
      <div className="mid-container">
        <div className="input1">
          <h6>Role Name*</h6>
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            size="small"
            name="role_name"
            value={roles.role_name}
            onChange={handleChange}
          />
        </div>
        <div className="input1">
          <h6>Status*</h6>
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            select
            size="small"
            name="status"
            value={roles.status}
            onChange={handleChange}
          >
            <MenuItem value={"Active"}>Active</MenuItem>
            <MenuItem value={"Inactive"}>Inactive</MenuItem>
          </TextField>
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Page</th>
              <th>
                <label htmlFor="add">
                  Add
                  {/* <input type="checkBox" id="add" /> */}
                </label>
              </th>
              <th>
                <label htmlFor="edit">
                  Edit
                  {/* <input type="checkBox" id="edit" /> */}
                </label>
              </th>
              <th>
                <label htmlFor="view">
                  View
                  {/* <input type="checkBox" id="view" /> */}
                </label>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td id="master">Master</td>
              <td>
                <input
                  type="checkBox"
                  checked={
                    roles.department.add &&
                    roles.designation.add &&
                    roles.role.add
                  }
                  name="master.add"
                  onChange={handleParentChange}
                />
              </td>
              <td>
                <input
                  type="checkBox"
                  checked={
                    roles.department.edit &&
                    roles.designation.edit &&
                    roles.role.edit
                  }
                  name="master.edit"
                  onChange={handleParentChange}
                />
              </td>
              <td>
                <input
                  type="checkBox"
                  checked={
                    roles.department.view &&
                    roles.designation.view &&
                    roles.role.view
                  }
                  name="master.view"
                  onChange={handleParentChange}
                />
              </td>
            </tr>

            <tr>
              <td className="subOption">Department</td>
              <td className="subOption">
                <input
                  type="checkBox"
                  id="dept-add"
                  name="department.add"
                  checked={roles.department.add}
                  onChange={handleChange}
                />
              </td>
              <td className="subOption">
                <input
                  type="checkBox"
                  id="dept-edit"
                  name="department.edit"
                  onChange={handleChange}
                  checked={roles.department.edit}
                />
              </td>
              <td className="subOption">
                <input
                  type="checkBox"
                  id="dept-view"
                  name="department.view"
                  onChange={handleChange}
                  checked={roles.department.view}
                />
              </td>
            </tr>
            <tr>
              <td className="subOption">Designation</td>
              <td className="subOption">
                <input
                  type="checkBox"
                  id="desi-add"
                  name="designation.add"
                  onChange={handleChange}
                  checked={roles.designation.add}
                />
              </td>
              <td className="subOption">
                <input
                  type="checkBox"
                  id="desi-edit"
                  name="designation.edit"
                  onChange={handleChange}
                  checked={roles.designation.edit}
                />
              </td>
              <td className="subOption">
                <input
                  type="checkBox"
                  id="desi-view"
                  name="designation.view"
                  onChange={handleChange}
                  checked={roles.designation.view}
                />
              </td>
            </tr>
            <tr>
              <td className="subOption">Role</td>
              <td className="subOption">
                <input
                  type="checkBox"
                  id="role-add"
                  name="role.add"
                  onChange={handleChange}
                  checked={roles.role.add}
                />
              </td>
              <td className="subOption">
                <input
                  type="checkBox"
                  id="role-edit"
                  name="role.edit"
                  onChange={handleChange}
                  checked={roles.role.edit}
                />
              </td>
              <td className="subOption">
                <input
                  type="checkBox"
                  id="role-view"
                  name="role.view"
                  onChange={handleChange}
                  checked={roles.role.view}
                />
              </td>
            </tr>

            <tr>
              <td>Menu Management</td>
              <td>
                <input
                  type="checkBox"
                  checked={
                    roles.main_menu.add &&
                    roles.subMenu_level_1.add &&
                    roles.subMenu_level_2.add
                  }
                  name="menu.add"
                  onChange={handleParentChange}
                />
              </td>
              <td>
                <input
                  type="checkBox"
                  checked={
                    roles.main_menu.edit &&
                    roles.subMenu_level_1.edit &&
                    roles.subMenu_level_2.edit
                  }
                  name="menu.edit"
                  onChange={handleParentChange}
                />
              </td>
              <td>
                <input
                  type="checkBox"
                  checked={
                    roles.main_menu.view &&
                    roles.subMenu_level_1.view &&
                    roles.subMenu_level_2.view
                  }
                  name="menu.view"
                  onChange={handleParentChange}
                />
              </td>
            </tr>

            <tr>
              <td className="subOption">Main Menu</td>
              <td className="subOption">
                <input
                  type="checkBox"
                  id="main-menu-add"
                  name="main_menu.add"
                  onChange={handleChange}
                  checked={roles.main_menu.add}
                />
              </td>
              <td className="subOption">
                <input
                  type="checkBox"
                  id="main-menu-edit"
                  name="main_menu.edit"
                  onChange={handleChange}
                  checked={roles.main_menu.edit}
                />
              </td>
              <td className="subOption">
                <input
                  type="checkBox"
                  id="main-menu-view"
                  name="main_menu.view"
                  onChange={handleChange}
                  checked={roles.main_menu.view}
                />
              </td>
            </tr>
            <tr>
              <td className="subOption">SubMenu Level 1</td>
              <td className="subOption">
                <input
                  type="checkBox"
                  id="sub1-menu-add"
                  name="subMenu_level_1.add"
                  onChange={handleChange}
                  checked={roles.subMenu_level_1.add}
                />
              </td>
              <td className="subOption">
                <input
                  type="checkBox"
                  id="sub1-menu-edit"
                  name="subMenu_level_1.edit"
                  onChange={handleChange}
                  checked={roles.subMenu_level_1.edit}
                />
              </td>
              <td className="subOption">
                <input
                  type="checkBox"
                  id="sub1-menu-view"
                  name="subMenu_level_1.view"
                  onChange={handleChange}
                  checked={roles.subMenu_level_1.view}
                />
              </td>
            </tr>
            <tr>
              <td className="subOption">SubMenu Level 2</td>
              <td className="subOption">
                <input
                  type="checkBox"
                  id="sub2-menu-add"
                  name="subMenu_level_2.add"
                  onChange={handleChange}
                  checked={roles.subMenu_level_2.add}
                />
              </td>
              <td className="subOption">
                <input
                  type="checkBox"
                  id="sub2-menu-edit"
                  name="subMenu_level_2.edit"
                  onChange={handleChange}
                  checked={roles.subMenu_level_2.edit}
                />
              </td>
              <td className="subOption">
                <input
                  type="checkBox"
                  id="sub2-menu-view"
                  name="subMenu_level_2.view"
                  onChange={handleChange}
                  checked={roles.subMenu_level_2.view}
                />
              </td>
            </tr>
            <tr>
              <td>User Management</td>
              <td>
                <input
                  type="checkBox"
                  checked={roles.create_user.add && roles.user_role_custom.add}
                  name="user.add"
                  onChange={handleParentChange}
                />
              </td>
              <td>
                <input
                  type="checkBox"
                  checked={
                    roles.create_user.edit && roles.user_role_custom.edit
                  }
                  name="user.edit"
                  onChange={handleParentChange}
                />
              </td>
              <td>
                <input
                  type="checkBox"
                  checked={
                    roles.create_user.view && roles.user_role_custom.view
                  }
                  name="user.view"
                  onChange={handleParentChange}
                />
              </td>
            </tr>

            <tr>
              <td className="subOption">Create User</td>
              <td className="subOption">
                <input
                  type="checkBox"
                  id="create-user-add"
                  name="create_user.add"
                  onChange={handleChange}
                  checked={roles.create_user.add}
                />
              </td>
              <td className="subOption">
                <input
                  type="checkBox"
                  id="create-user-edit"
                  name="create_user.edit"
                  onChange={handleChange}
                  checked={roles.create_user.edit}
                />
              </td>
              <td className="subOption">
                <input
                  type="checkBox"
                  id="create-user-view"
                  name="create_user.view"
                  onChange={handleChange}
                  checked={roles.create_user.view}
                />
              </td>
            </tr>
            <tr>
              <td className="subOption">User Role Custom</td>
              <td className="subOption">
                <input
                  type="checkBox"
                  id="custom-user-add"
                  name="user_role_custom.add"
                  onChange={handleChange}
                  checked={roles.user_role_custom.add}
                />
              </td>
              <td className="subOption">
                <input
                  type="checkBox"
                  id="custom-user-edit"
                  name="user_role_custom.edit"
                  onChange={handleChange}
                  checked={roles.user_role_custom.edit}
                />
              </td>
              <td className="subOption">
                <input
                  type="checkBox"
                  id="custom-user-view"
                  name="user_role_custom.view"
                  onChange={handleChange}
                  checked={roles.user_role_custom.view}
                />
              </td>
            </tr>

            <tr>
              <td>Project Management</td>
              <td>
                <input
                  type="checkBox"
                  checked={
                    roles.create_project.add &&
                    roles.create_job_task.add &&
                    roles.assign_task.add
                  }
                  name="project.add"
                  onChange={handleParentChange}
                />
              </td>
              <td>
                <input
                  type="checkBox"
                  checked={
                    roles.create_project.edit &&
                    roles.create_job_task.edit &&
                    roles.assign_task.edit
                  }
                  name="project.edit"
                  onChange={handleParentChange}
                />
              </td>
              <td>
                <input
                  type="checkBox"
                  checked={
                    roles.create_project.view &&
                    roles.create_job_task.view &&
                    roles.assign_task.view
                  }
                  name="project.view"
                  onChange={handleParentChange}
                />
              </td>
            </tr>

            <tr>
              <td className="subOption">Create Project</td>
              <td className="subOption">
                <input
                  type="checkBox"
                  id="create-project-add"
                  name="create_project.add"
                  onChange={handleChange}
                  checked={roles.create_project.add}
                />
              </td>
              <td className="subOption">
                <input
                  type="checkBox"
                  id="create-project-edit"
                  name="create_project.edit"
                  onChange={handleChange}
                  checked={roles.create_project.edit}
                />
              </td>
              <td className="subOption">
                <input
                  type="checkBox"
                  id="create-project-view"
                  name="create_project.view"
                  onChange={handleChange}
                  checked={roles.create_project.view}
                />
              </td>
            </tr>
            <tr>
              <td className="subOption">Create Job/ Task</td>
              <td className="subOption">
                <input
                  type="checkBox"
                  id="create-job-add"
                  name="create_job_task.add"
                  onChange={handleChange}
                  checked={roles.create_job_task.add}
                />
              </td>
              <td className="subOption">
                <input
                  type="checkBox"
                  id="create-job-edit"
                  name="create_job_task.edit"
                  onChange={handleChange}
                  checked={roles.create_job_task.edit}
                />
              </td>
              <td className="subOption">
                <input
                  type="checkBox"
                  id="create-job-view"
                  name="create_job_task.view"
                  onChange={handleChange}
                  checked={roles.create_job_task.view}
                />
              </td>
            </tr>
            <tr>
              <td className="subOption">Assign Task</td>
              <td className="subOption">
                <input
                  type="checkBox"
                  id="assign-task-add"
                  name="assign_task.add"
                  onChange={handleChange}
                  checked={roles.assign_task.add}
                />
              </td>
              <td className="subOption">
                <input
                  type="checkBox"
                  id="assign-task-edit"
                  name="assign_task.edit"
                  onChange={handleChange}
                  checked={roles.assign_task.edit}
                />
              </td>
              <td className="subOption">
                <input
                  type="checkBox"
                  id="assign-task-view"
                  name="assign_task.view"
                  onChange={handleChange}
                  checked={roles.assign_task.view}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoleManagement;
