import React from "react";
import { NavLink } from "react-router-dom";

function ComponentSideBar() {

  const masterMenu = [
    { title: "User", path: "/admin/user" },
    { title: "Comments", path: "/admin/comments" },
    { title: "Games", path: "/admin/games" },
    { title: "Games Screenshots", path: "/admin/game_screenshots" },
    { title: "Games Tags", path: "/admin/game_tags" },
    { title: "Games Videos", path: "/admin/game_videos" },
    { title: "Review", path: "/admin/reviews" },
    { title: "Tags", path: "/admin/tags" },
    { title: "User Game Library", path: "/admin/user_game_library" },
    { title: "User Wishlists", path: "/admin/user_wishlists" },
  ];

  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="/#"
      >
        <div className="sidebar-brand-text mx-3">Admin TjoStyle</div>
      </a>

      <li className="nav-item">
        <NavLink to="/" className="nav-link">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </NavLink>
      </li>

      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="/#"
          data-toggle="collapse"
          data-target="#masterSection"
          aria-expanded="true"
          aria-controls="masterSection"
        >
          <i className="fas fa-database"></i>
          <span>Master Data</span>
        </a>
        <div
          id="masterSection"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            {masterMenu.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  "collapse-item" + (isActive ? " active" : "")
                }
              >
                {item.title}
              </NavLink>
            ))}
          </div>
        </div>
      </li>
    </ul>
  );
}

export default ComponentSideBar;
