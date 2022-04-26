import '../styles/globals.css';

import { wrapper } from '../app/store';

const MyApp = ({ Component, pageProps }) => {
	return <Component {...pageProps} />;
};

export default wrapper.withRedux(MyApp);
