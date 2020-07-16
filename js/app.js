const car = document.getElementById('carrito')
const courses = document.getElementById('lista-cursos')
const courseList = document.querySelector('#lista-carrito tbody')
const emptyCarBtn = document.getElementById('vaciar-carrito')

loadEventListener()

/**
 * @description loads every event as soon as the page is load
 * @author Andres Acosta
 * @param {number} radio El radio de los círculos laterales del cilindro
 * @param {number} altura La altura del cilindro
 * @return {number}
*/
function loadEventListener(){
  courses.addEventListener('click', buyCourse)
  car.addEventListener('click', reomoveCourse)
  emptyCarBtn.addEventListener('click', emptyCar)

  //It is execute when page is loads
  document.addEventListener('DOMContentLoaded', readLocalStorage)

}

/**
 * @description Add a course to car when teh user clicks the button 'add to car'
 * @author Andres Acosta
 * @param {object} e This object contains all imformation about the event click
 * @return {void}
*/
function buyCourse(e){
  e.preventDefault()
  if(e.target.classList.contains('agregar-carrito')){
    const course = e.target.parentElement.parentElement
    readDataCourse(course)
  }
}

/**
 * @description Read data of a course and it make a object with the imformation
 * @author Andres Acosta
 * @param {HTMLDivElement} course Contains all la imformacion about the course
 * @return {void}
*/
function readDataCourse(course){
  const courseInfo = {
    image: course.querySelector('img').src,
    title: course.querySelector('h4').textContent,
    price: course.querySelector('.precio span').textContent,
    id: course.querySelector('a').getAttribute('data-id')
  }
  insertInCar(courseInfo)
}
/**
 * @description Make the necesary HTML to add a course in the car seccion then add it.
 * @author Andres Acosta
 * @param {Object} course is an object with the information to add to DOM in the car seccion
 * @return {void}
*/
function insertInCar(course){
  const row = document.createElement('tr')
  row.innerHTML = `
    <td> <img src="${course.image}" with="100"></td>
    <td> ${course.title} </td>
    <td> ${course.price} </td>
    <td>
      <a href="#" class="borrar-curso" data-id="${course.id}"></a>
    </td>
  `
  courseList.appendChild(row)
  saveCourseLocalStorage(course)
}

/**
 * @description Remove a course of car in the DOM.
 * @author Andres Acosta
 * @param {Object} e contains all information about event click
 * @return {void}
*/
function reomoveCourse(e){
  e.preventDefault()
  let course,
      courseId
  if(e.target.classList.contains('borrar-curso')){
    e.target.parentElement.parentElement.remove()
    course = e.target.parentElement.parentElement
    courseId = course.querySelector('a').getAttribute('data-id')
  }
  removeCourseLocalStorage(courseId)
}
/**
 * @description Remove all course of the car in the DOM.
 * @author Andres Acosta
 * @return {void}
*/
function emptyCar(){
  while(courseList.firstChild){
    courseList.removeChild(courseList.firstChild)
  }
  removeAllCoursesLocalSotrage()

  return false
}
/**
 * @description Save a course in the local storage.
 * @author Andres Acosta
 * @param {Object} course contains all information about course to save
 * @return {void}
*/
function saveCourseLocalStorage(course){
  let courses
  courses = getCoursesLocalStorage()
  courses.push(course)
  localStorage.setItem('courses',JSON.stringify(courses))
}

/**
 * @description Check if there are elemnts in the local storage and returs them
 * in a array, in case it is empty return a empty array.
 * @author Andres Acosta
 * @param {Object} course contains all information about course to save
 * @return {Array}  an array whit the course in the local storage.
*/
function getCoursesLocalStorage(){
  let courses = []
  if(localStorage.getItem('courses')!=null){
    courses = JSON.parse(localStorage.getItem('courses'))
  }
  return courses
}

/**
 * @description Print the courses form local storage in the car
 * @author Andres Acosta
 * @return {void}
*/
function readLocalStorage(){

  let courses = getCoursesLocalStorage()
  courses.forEach((course)=>{
    const row = document.createElement('tr')
    row.innerHTML = `
      <td> <img src="${course.image}" with="100"></td>
      <td> ${course.title} </td>
      <td> ${course.price} </td>
      <td>
        <a href="#" class="borrar-curso" data-id="${course.id}"></a>
      </td>
    `
    courseList.appendChild(row)
  })
}

/**
 * @description Remove a course by ID in local storage
 * @author Andres Acosta
 * @param {integuer} id the ID of course to remove
 * @return {void}
*/
function removeCourseLocalStorage(id){
  let courses = getCoursesLocalStorage()

  courses.forEach((courseLS,index)=>{
    if(courseLS.id === id){
      courses.splice(index,1)
    }
  })
  localStorage.setItem('courses', JSON.stringify(courses) );
}

/**
 * @description Remove all courses in the local storage
 * @author Andres Acosta
 * @return {void}
*/
function removeAllCoursesLocalSotrage() {
    localStorage.clear();
}
