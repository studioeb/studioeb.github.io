/*
HTML source for Ethan Bayer's personal website
Copyright (C) 2025 Ethan Bayer

This file is part of the source code for studioeb.github.io.

The source code of studioeb.github.io is free software: you can
redistribute it and/or modify it under the terms of the GNU General
Public License as published by the Free Software Foundation, either
version 3 of the License, or (at your option) any later version.

The source code of studioeb.github.io is distributed in the hope
that it will be useful, but WITHOUT ANY WARRANTY; without even 
the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

const sidebar = document.getElementById("sidebar");
const headerDesktop = document.getElementById("header-desktop");
const headerMobile = document.getElementById("header-mobile");

const menuIcon = document.getElementById("menu-icon");
const xIcon = document.getElementById("x-icon");

function openCloseMenu() {
  sidebar.classList.add("sidebar-animated");
  const toggleDir = sidebar.classList.toggle("sidebar-opened");

  if (toggleDir === false) {
    sidebar.ariaHidden = "true";
    sidebar.inert = true;
    menuIcon.style.display = "initial";
    xIcon.style.display = "none";
  } else {
    sidebar.ariaHidden = "false";
    sidebar.inert = false;
    menuIcon.style.display = "none";
    xIcon.style.display = "initial";
  }

  /* Delay the removal of the sidebar-animated class until the transition is done */
  sidebar.addEventListener("transitionend", function removeSidebarTransition() {
    sidebar.classList.remove("sidebar-animated");
    sidebar.removeEventListener("transitionend", removeSidebarTransition);
  });
}

function closeMenu(doTransition = true) {
  if (doTransition) {
    sidebar.classList.add("sidebar-animated");
  }
  sidebar.classList.remove("sidebar-opened");

  sidebar.ariaHidden = "true";
  sidebar.inert = true;
  menuIcon.style.display = "initial";
  xIcon.style.display = "none";

  if (doTransition) {
    /* Delay the removal of the sidebar-animated class until the transition is done */
    sidebar.addEventListener(
      "transitionend",
      function removeSidebarTransition() {
        sidebar.classList.remove("sidebar-animated");
        sidebar.removeEventListener("transitionend", removeSidebarTransition);
      }
    );
  }
}

function switchHeader() {
  if (window.innerWidth <= 768) {
    /* Enable mobile header */
    headerMobile.ariaHidden = "false";
    headerMobile.inert = false;
    /* Disable desktop header */
    headerDesktop.ariaHidden = "true";
    headerDesktop.inert = true;
    /* Disable sidebar */
    sidebar.ariaHidden = "true";
    sidebar.inert = true;

    document.getElementById("nav-list").addEventListener("click", closeMenu);
    closeMenu(false);
  } else if (window.innerWidth > 768) {
    /* Disable mobile header */
    headerMobile.ariaHidden = "true";
    headerMobile.inert = true;
    /* Enable desktop header */
    headerDesktop.ariaHidden = "false";
    headerDesktop.inert = false;
    /* Enable sidebar */
    sidebar.ariaHidden = "false";
    sidebar.inert = false;

    document.getElementById("nav-list").removeEventListener("click", closeMenu);
  }
}

window.addEventListener("resize", switchHeader);

/* Run on page load */
switchHeader();
