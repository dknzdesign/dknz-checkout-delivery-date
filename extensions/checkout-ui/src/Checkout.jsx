import {
  reactExtension,
  BlockStack,
  useApplyMetafieldsChange,
  useMetafield,
  DatePicker,
  Text
} from "@shopify/ui-extensions-react/checkout";

// Choose an extension target - purchase.checkout.block.render also change in extension points in config shopify.extention.toml
export default reactExtension("purchase.checkout.shipping-option-list.render-after", () => (
  <Extension />
));
// COMPONENT
function Extension() {
    // Define the metafield namespace and key - need to create manually shop or in app
  const metafieldNamespace = "dknz";
  const metafieldKey = "delivery_date";
  const addDaysToDate = (date, days)=>{
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

  const leadTime = 4;
  const from_date = addDaysToDate(new Date(),leadTime); 
  const formatDate = (date)=>{
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns month from 0 to 11
  const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
 

const before_from_date = addDaysToDate(from_date,-1);
const deliveryDate = useMetafield({
  namespace: metafieldNamespace,
  key: metafieldKey,
  value:formatDate(from_date )
});

const setDeliveryDate = useApplyMetafieldsChange();

  //  Render
  return (
    <BlockStack border={"dotted"} padding={"tight"}>
      <DatePicker selected={deliveryDate?.value} onChange={(value)=>{
        setDeliveryDate({
          type: "updateMetafield",
                 namespace: metafieldNamespace,
                 key: metafieldKey,
               valueType: "string",
                value,
        });
      }} disabled={["Sunday","Saturday",{end:formatDate(before_from_date)}]} />
      <Text size="small">Selected date: {deliveryDate?.value}</Text>
    </BlockStack>
  );


}