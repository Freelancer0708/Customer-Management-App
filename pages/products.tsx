import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../components/firebase/firebaseConfig";
import { getFirestore, collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth  } from '../components/auth/AuthContext';
import { useRouter } from 'next/router'
import styles from '../components/css/products.module.css';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function ProductModal({ product, onClose }) {
    if (!product) return null;
  
    return (
      <div className={styles.modalBackground}>
        <div className={styles.modalContent}>
          <h2>商品詳細</h2>
          <p><strong>商品ID:</strong> {product.商品ID}</p>
          <p><strong>商品名:</strong> {product.商品名}</p>
          <p><strong>カテゴリ:</strong> {product.カテゴリ}</p>
          <p><strong>価格:</strong> ¥{product.価格}</p>
          <p><strong>在庫数:</strong> {product.在庫数}</p>
          <p><strong>説明:</strong> {product.説明}</p>
          <button className={styles.modalButton} onClick={onClose}>閉じる</button>
        </div>
      </div>
    );
}

export default function Products() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { currentUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!currentUser) {
            router.push('/login');
            return;
        }

      const getProducts = async () => {
        const productsCollection = await getDocs(query(collection(db, "Products"), orderBy("商品ID")));
        setProducts(productsCollection.docs.map(doc => ({...doc.data(), id: doc.id})));
      };
  
      getProducts();
    }, [currentUser, router]);

    if (!currentUser) {
        return <div>Loading...</div>; // または適切な代替コンテンツ
    }

    const handleItemClick = (product) => {
        setSelectedProduct(product);
    };
    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    return (
      <>
        <h1>Products Page</h1>

        <section>
            <article>
                <ul className={styles.products}>
                    {products.map(product => (
                        <li className={styles.item} key={product.id} onClick={() => handleItemClick(product)}>
                            <div className={styles.id}><strong>商品ID:</strong> {product.商品ID}</div>
                            <div className={styles.name}><strong>商品名:</strong> {product.商品名}</div>
                            <div className={styles.category}><strong>カテゴリ:</strong> {product.カテゴリ}</div>
                            <div className={styles.price}><strong>価格:</strong> ¥{product.価格}</div>
                            <div className={styles.value}><strong>在庫数:</strong> {product.在庫数}</div>
                            <div className={styles.description}><strong>説明:</strong> {product.説明}</div>
                        </li>
                    ))}
                </ul>
            </article>
        </section>
        {selectedProduct && <ProductModal product={selectedProduct} onClose={handleCloseModal} />}
      </>
    );
  }
  