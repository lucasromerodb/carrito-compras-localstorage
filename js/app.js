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
}

// funciones
function selectCourse(e) {
  e.preventDefault();

  // Delegation
  if (e.target.classList.contains('agregar-carrito')) {
    const course = e.target.parentElement.parentElement;
    console.log(course);
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

function addToCart(cartCourse) {
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

function removeCourseFromCart(e) {
  e.preventDefault();
  if (e.target.classList.contains('borrar-curso')) {
    e.target.parentElement.parentElement.remove();
  }
}

function emptyCoursesCart(e) {
  e.preventDefault();
  coursesList.innerHTML = '';
  while (coursesList.firstChild) {
    coursesList.removeChild(coursesList.firstChild);
  }
  return false;
}
