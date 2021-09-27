import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from "react-router-dom"

function Form() {

    const productName = useRef()
    const productQuantity = useRef()
    const productImage = useRef()
    const productPrice = useRef()

    const history = useHistory();

    const [curProduct, setcurProduct] = useState(null);
    let data = localStorage.getItem("product");

    useEffect(() => {
        setcurProduct(curProduct);
    }, [data, curProduct])

    function getData(e) {
        e.preventDefault();

        let reader = new FileReader();
        reader.onloadend = function () {
            let curProduct = {
                "Name": productName.current.value,
                "Price": productPrice.current.value,
                "Quantity": productQuantity.current.value,
                "Image": reader.result
            }
            setcurProduct(curProduct);
            saveTOlocal(curProduct);

        }
        reader.readAsDataURL(productImage.current.files[0]);
    }

    function saveTOlocal(product) {
        if (!localStorage.getItem("product")) {
            localStorage.setItem("product", JSON.stringify([product]))
        } else {
            let existing_data = JSON.parse(localStorage.getItem("product"));
            existing_data.push(product)
            localStorage.setItem("product", JSON.stringify(existing_data))
        }

        window.location.reload();
    }

    return (
        <div>
            <h1> Codingmart Task , Storing Products in Localhost</h1>
            <div className="container">
                <div className="inner">
                <form onSubmit={(e) => getData(e)}>
                    <div className="form_field">
                        <label htmlFor="product-name">Product Name</label>
                        <input type="text" name="product-name" ref={productName} />
                    </div>

                    <div className="form_field">
                        <label htmlFor="product-name">Product Quantity</label>
                        <input type="number" name="product-quantity" ref={productQuantity} />
                    </div>

                    <div className="form_field">
                        <label htmlFor="picture">Upload Image </label>
                        <input type="file" name="picture" id="picture" ref={productImage} />
                    </div>

                    <div className="form_field">
                        <label htmlFor="product-name">Product Price</label>
                        <input type="number" name="product-prixe" ref={productPrice} />
                    </div>

                    <button type="submit">Save Product</button>
                </form>
                </div>
            </div>
                <div  class="cards">
            {
                localStorage.getItem("product") ? JSON.parse(localStorage.getItem("product")).map((e, i) => {
                    return (
                        <div key={i} >
                            <div className="card" key={i}>
                                {console.log(e)}
                                {<span>Product Name : {e.Name}</span>}
                                <span>Product Price : {e.Price}</span>
                                <span>Product Quantity : {e.Quantity}</span>
                                <span>
                                    <img src={e && e.Image} alt="Not Uploaded" />
                                </span>
                            </div>

                        </div>
                    )

                }) : <h2>No Products added yet...</h2>
            }
            </div>
     
        </div>
    )
}

export default Form


// e.map((e, index) => {
//     return (<div key={index} className="contain">
//         <div className="card">
//             <span>Product Name : {e.Name}</span>
//             <span>Product Price : {e.Price}</span>
//             <span>Product Quantity : {e.Quantity}</span>
//             <span>
//                 <img src={e.Image} alt="Not Uploaded" />
//             </span>
//         </div>
//     </div>)
// }