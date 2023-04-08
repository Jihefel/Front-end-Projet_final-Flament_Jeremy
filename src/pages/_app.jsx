import "../sass/main.sass"
import Layout from '../layouts/Container';
import { SSRProvider } from "react-bootstrap";
import { Provider } from 'react-redux';
import { store } from '../redux/store/store';

export default function App({ Component, pageProps }) {
  return (
  <Provider store={store}>
    <SSRProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SSRProvider>
  </Provider>
  )
}