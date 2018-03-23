// variables
const cart = document.querySelector('#carrito');
const courses = document.querySelector('#lista-cursos');
const coursesList = document.querySelector('#lista-carrito tbody');
const emptyCart = document.querySelector('#vaciar-carrito');

// listeners
eventListeners();

function eventListeners() {
  courses.addEventListener('click', selectCourse);
  coursesList.addEventListener('click', removeCourseFromCart);
  emptyCart.addEventListener('click', emptyCoursesCart);
  document.addEventListener('DOMContentLoaded', getCoursesFromLocalStorageOnLoad);
}

// funciones
function selectCourse(e) {
  e.preventDefault();

  // Delegation
  if (e.target.classList.contains('agregar-carrito')) {
    const course = e.target.parentElement.parentElement;
    readDataCourse(course);
  }

}

function readDataCourse(course) {
  const courseInfo = {
    img: course.querySelector('img').src,
    title: course.querySelector('h4').textContent,
    price: course.querySelector('.precio span').textContent,
    id: course.querySelector('a').getAttribute('data-id')
  }
  // console.log(courseInfo);
  addToCart(courseInfo)
}

function templateConstructor(cartCourse) {
  const row = document.createElement('tr');

  row.innerHTML = `
    <td>
      <img src="${cartCourse.img}" width="120">
    </td>
    <td>${cartCourse.title}</td>
    <td>${cartCourse.price}</td>
    <td>
      <a href="#" class="borrar-curso" data-id="${cartCourse.id}">X</a>
    </td>
  `;

  coursesList.appendChild(row);
}
function addToCart(cartCourse) {
  templateConstructor(cartCourse);
  saveCourseLocalStorage(cartCourse);
}

function removeCourseFromCart(e) {
  e.preventDefault();
  let course = e.target.parentElement.parentElement;
  let courseId;
  if (e.target.classList.contains('borrar-curso')) {
    e.target.parentElement.parentElement.remove();
    courseId = course.querySelector('a').getAttribute('data-id');
    removeCourseFromCartFromLocalStorage(courseId);
  }
}

function removeCourseFromCartFromLocalStorage(courseId) {
  let coursesLS;

  coursesLS = getCoursesFromLocalStorage();

  coursesLS.forEach(function (course, i) {
    if (course.id === courseId) {
      coursesLS.splice(i, 1);
    }
  });

  localStorage.setItem('courses', JSON.stringify(coursesLS));
}

function emptyCoursesCart(e) {
  e.preventDefault();
  coursesList.innerHTML = '';
  while (coursesList.firstChild) {
    coursesList.removeChild(coursesList.firstChild);
  }
  // return false;
  emptyCourseCartFromLocalStorage();
}

function emptyCourseCartFromLocalStorage() {
  localStorage.clear();
}

function saveCourseLocalStorage(cartCourse) {
  let courses;

  courses = getCoursesFromLocalStorage();

  courses.push(cartCourse);
  localStorage.setItem('courses', JSON.stringify(courses));

}

function getCoursesFromLocalStorage() {
  let coursesLS;
  if (localStorage.getItem('courses') === null) {
    coursesLS = [];
  } else {
    coursesLS = JSON.parse(localStorage.getItem('courses'));
  }
  console.log(coursesLS);
  return coursesLS;
}

function getCoursesFromLocalStorageOnLoad() {
  let coursesLS;

  coursesLS = getCoursesFromLocalStorage();

  coursesLS.forEach(function (course) {
    templateConstructor(course);
  });
}
