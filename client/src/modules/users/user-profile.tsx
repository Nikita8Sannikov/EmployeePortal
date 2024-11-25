import React, { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserById } from "./usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { RootState } from "../../store";
import "./userDetails.css";
import { remind } from "../auth/authSlice";
import SideLayout from "../../components/side-layout";

const UserProfile: React.FC = () => {
	const { id } = useParams();

	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const { user, status } = useSelector((state: RootState) => state.users);

	// const user = useSelector((state: RootState) => state.auth.user);
	// if (user) {
	// 	console.log(user);
	// }

	useEffect(() => {
		if (id) {
			dispatch(fetchUserById(id));
		}
	}, [dispatch, id]);

	// useEffect(() => {
	// 	console.log(
	// 		`Рендеринг компонента UserProfile: ${JSON.stringify(
	// 			user?.last_name
	// 		)}`
	// 	);
	// }, [user]);

	// useEffect(() => {
	// 	console.log(`Текущий Статус загрузки: ${status}`);
	// }, [status]);

	const callbacks = {
		onEdit: useCallback(() => {
			navigate(`/edit/${id}`);
		}, [dispatch]),
		onBack: useCallback(() => {
			dispatch(remind());
			navigate("/");
		}, [dispatch]),
	};

	return (
		<div className="profile-container">
			{user ? (
				<>
					<header className="profile-header">
						<SideLayout side="between">
							<button
								onClick={callbacks.onBack}
								className="back-button"
							>
								Назад
							</button>
							<button
								onClick={callbacks.onEdit}
								className="edit-button"
							>
								Редактировать
							</button>
						</SideLayout>
						<SideLayout side="start">
							<img src={user.avatar} alt={user.first_name} />

							<div className="profile-title">
								{user.first_name ? user.first_name : user.name}{" "}
								{user.last_name && user.last_name}
								<h4>Партнёр</h4>
							</div>
						</SideLayout>
					</header>

					<section className="profile-content">
						<div className="partner-section">
							<div className="partner-info">
								<p>
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Reiciendis iure aspernatur
									eos tempore hic officiis consequuntur
									veniam. Consequuntur cupiditate culpa veniam
									possimus minima exercitationem, corrupti
									error cum alias sapiente perferendis
									eligendi maiores repellendus quisquam sunt
									totam! Optio ut amet sed laudantium numquam
									unde soluta pariatur. Voluptas molestiae
									fugiat dolor laboriosam ullam saepe
									assumenda. Consequuntur corporis quod quas
									saepe ullam impedit quos minima asperiores
									laudantium officiis ducimus suscipit quaerat
									eligendi ut amet tempora quasi delectus
									provident dolor voluptate, itaque tenetur!
									Quasi temporibus, officiis alias aspernatur
									in veniam ex, officia ipsum asperiores
									perferendis dolores optio repellat cumque
									voluptatum blanditiis, quaerat provident
									error. Lorem ipsum dolor sit amet,
									consectetur adipisicing elit. Dolores nulla
									eveniet atque sit aperiam consectetur
									cupiditate repellat, possimus minus eaque
									fuga illum! Ipsum minus cupiditate officiis
									neque alias dolores tempora asperiores eum.
									Provident, commodi rem. Quasi eaque
									asperiores natus molestias ea commodi odit
									ipsam corrupti deserunt temporibus modi
									tempora sed voluptas facere ab voluptate, id
									ullam esse magni necessitatibus autem
									exercitationem inventore. Autem voluptatem
									omnis quae eveniet, distinctio alias eius
									laudantium, et architecto, voluptatum non?
									Rerum natus repellat quas quos at fugiat,
									quidem eius sequi dolores tempore vitae iure
									suscipit nesciunt odit dicta quibusdam
									voluptatum voluptates ipsam dolore maiores
									ratione? Cumque magnam, odit ab velit
									expedita cum officia earum aspernatur id
									sint inventore totam molestias eligendi
									omnis similique est maiores! Reprehenderit
									cumque ipsam facere sequi iure facilis ut
									nam aliquam. Inventore sint animi quis quam
									repudiandae, hic ad odit officiis numquam
									error quasi molestias, voluptatum alias
									aperiam deleniti aspernatur id mollitia
									necessitatibus ex ab vero aliquam corporis
									maiores rerum! Corporis libero ipsam, eos
									beatae labore corrupti et qui blanditiis,
									ipsa omnis fugiat reprehenderit est rem
									aliquid porro magni pariatur sit maiores?
									Totam nisi facere inventore odio ullam in
									possimus earum eum recusandae sequi suscipit
									error tempora laboriosam cumque dolore odit,
									molestiae molestias officiis ab. Minima
									accusantium optio cupiditate, ad beatae
									voluptatem incidunt recusandae saepe quo
									asperiores necessitatibus, quas nobis
									expedita id eveniet, quidem tenetur!
									Laudantium aut modi consequuntur nam
									aliquid? Amet porro recusandae esse. Nobis
									esse eius est sequi ducimus, impedit quaerat
									blanditiis sunt recusandae maxime, magnam
									ullam nulla voluptates non beatae omnis
									praesentium distinctio. Dolorum esse ducimus
									sunt quasi quisquam nisi tenetur aliquam?
									Perferendis iusto deleniti nostrum earum
									culpa eligendi, repellendus beatae commodi
									officia doloribus blanditiis explicabo autem
									a! Saepe magni tempore, esse ad officiis
									ullam quos, temporibus iure quidem
									repellendus unde corrupti eos error sed,
									sint earum id? Doloremque odio distinctio ab
									itaque optio corrupti, consequuntur odit
									pariatur, rerum doloribus iusto inventore ea
									voluptatum aliquid quia quidem officia dolor
									maiores obcaecati architecto sit dignissimos
									exercitationem minus! Illo, facere et libero
									saepe ea id quam? Dolorum, recusandae
									excepturi ad hic cum exercitationem animi
									sit provident. Maxime quas recusandae
									ratione unde earum dolorum officia excepturi
									fugit dolor voluptatibus! Inventore repellat
									porro, magni odio animi dolor temporibus
									voluptatum minima nesciunt, mollitia
									perspiciatis sunt vero odit eius minus
									aperiam. Inventore modi corporis repudiandae
									iste quod quibusdam, nisi voluptas
									voluptatibus exercitationem et, numquam
									deserunt. Aliquid, molestiae! Assumenda
									numquam maiores est. Nisi voluptate beatae
									iusto libero maxime aut id impedit corporis
									nulla ratione quasi perspiciatis architecto
									commodi at, reprehenderit magnam quas? Ut
									corporis accusantium rerum cum voluptatem
									amet inventore eaque saepe voluptatibus
									asperiores. At quam officia voluptatibus hic
									molestiae dolorum ipsum officiis eveniet
									consequuntur earum dicta tenetur alias ullam
									commodi, ut ex odit voluptatum quaerat
									itaque illo architecto consectetur
									laudantium laborum? Cumque, ipsum. At libero
									velit asperiores earum distinctio ullam quo
									eaque! Obcaecati temporibus laboriosam,
									veniam quo tempore provident dolor, impedit
									architecto non quos possimus sit illo animi
									assumenda fugit voluptatum culpa ipsa illum.
									Inventore error earum eos? Repellendus
									quaerat ea ducimus sint autem.
								</p>
							</div>
						</div>

						<div className="user-details-contacts">
							<p>Email: {user.email}</p>
						</div>
					</section>
				</>
			) : (
				<p>Загрузка...</p>
			)}
		</div>
	);
};

export default React.memo(UserProfile);
