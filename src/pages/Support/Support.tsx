import { FC } from "react";
import { IonPage } from "@ionic/react";
import StickyScrollLayout from "../../components/StickyScrollLayout/StickyScrollLayout";
import image from "../../assets/images/subject_image.png";

const Support: FC = () => {
  return (
    <IonPage className="primaryPage">
      <StickyScrollLayout posterSrc={image} topLabel="Category: qweqwe">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni odio
          repellendus ipsum sequi fugit beatae eaque illo est modi dignissimos
          incidunt, numquam hic harum, deserunt dolore accusamus. Porro, nobis
          autem. Suscipit molestiae dolor doloribus, exercitationem quas
          expedita explicabo porro neque perferendis officiis consectetur
          tempore ut, nisi modi ea quo corrupti qui voluptas maiores nihil eum
          animi repellat dolores. Accusamus nostrum qui odit voluptate nobis
          sunt adipisci, sed suscipit ipsa, hic nisi vel explicabo provident.
          Tempore cum enim, consequuntur distinctio recusandae ad obcaecati
          culpa nesciunt ratione. Voluptas dolorum, dignissimos, amet nemo totam
          doloremque dolores eos quam est similique minus. Laudantium odit,
          nostrum temporibus cum repellat alias expedita hic delectus, ex
          aspernatur error ipsum ducimus deserunt nesciunt laboriosam quasi
          doloremque harum dolore aut! Eius error fugiat, praesentium doloremque
          incidunt, officia similique, eos maiores eligendi tempore ducimus
          beatae. Dolore officia dolores rem error aliquam exercitationem
          dignissimos quas. Dolorem, quaerat impedit doloribus enim rerum,
          labore maxime iste libero fuga similique voluptas officiis consequatur
          minima esse id saepe adipisci unde quia corporis aliquam dolores
          earum? Quae sapiente quo aliquam aut explicabo cupiditate dicta beatae
          veniam nihil error molestias sunt eos nesciunt, ullam cumque
          aspernatur recusandae laborum animi magnam. Quidem voluptatibus
          accusantium alias ea assumenda. Nam!
        </p>
      </StickyScrollLayout>
    </IonPage>
  );
};

export default Support;
