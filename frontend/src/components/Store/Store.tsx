import '../../styles/Products.css'
import Products from '../Products/Products.tsx'

const Store = () => {


  return (
    <section className='store'>
      <h2>Tienda</h2>
      <Products category={'man'} title={'para hombres'} className={'grid-container'}/>
      <hr />
      <Products category={'woman'} title={'para mujeres'} className={'grid-container'}/>
      <hr />
      <Products category={'accesories'} title={'accesorios'} className={'grid-container'}/>
    </section>
  )
}

export default Store