
import { ProductDetailsPageContent } from '@qb/dashboard-ui';
import { useLocalSearchParams } from 'expo-router';

// this component uses expo-router and therefore must live inside the expo app
export default function ProductDetailsPage() {
  const { productId } = useLocalSearchParams<{ productId: string }>();

  return (
    <ProductDetailsPageContent productId={productId} />
  );
}
