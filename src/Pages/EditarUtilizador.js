import React, {useState, useEffect}  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import Background from '../Images/Background2.svg';
import imgPlaceholder from '../Images/Placeholder.jpg';
import '../Styles/EditarUtilizador.css';
import { atualizaUtilizador, getUtilizadorById } from '../Store/Utilizadores/Actions';
import { storage } from '../Firebase/FbConfig';
import Loading from '../Components/Geral/Loading';
import useAuthentication from '../Firebase/useAuthentication';
import BackArrow from '../Components/Geral/BackArrow'

const TiposAceites = 'image/x-png, image/png, image/jpg, image/jpeg';
const arrayTiposAceites = TiposAceites.split(",").map((item) => {
    return item.trim()
});

const Fundo = styled.div`
    background-image: url(${Background});
    background-repeat: no-repeat;
    background-size: 100% auto;
    margin: 0;
    padding: 0;
`;

const Div = styled.div`
    padding: 40px 30px 0 30px;
`;

const ProfilePicture = styled.div`
    margin: 0 auto 50px auto;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: 130px;
    width: 130px;
    border-radius: 50%;
    border: solid 3px #227093;
`;

function EditarUtilizador () {

    const { user, isLoading, isAuthenticated } = useAuth0();
    const dispatch = useDispatch();
    const [valores, setValores] = useState({
        imagemUser: '',
        nomeUtilizador: '',
        biografia: '',
        pais: '',
        cidade: '',
    });
    const [imagem, setImagem] = useState(null);
    const ownUser = useSelector(({Utilizadores})=> Utilizadores.ownUser)
    const isLoadingUser = useSelector(({Utilizadores}) => Utilizadores.isLoadingSelf)

    useEffect(() => {
        if (user && !isLoading && isAuthenticated) {
            dispatch(getUtilizadorById(user.email))
        }
    },[user])
    useEffect(() => {
        if (!isLoadingUser) {
            storage.ref('imagensUtilizadores').child(`${ownUser.imagemUser}`).getDownloadURL().then((url) => {
                setValores({
                    imagemUser: ownUser.imagemUser,
                    nomeUtilizador: ownUser.nomeUtilizador,
                    biografia: ownUser.biografia,
                    pais: ownUser.pais,
                    cidade: ownUser.cidade
                })
                setImagem(url)
            })
        }
    },[isLoadingUser])

    const verificarFicheiro = (file) => {
        if (file.type && !arrayTiposAceites.includes(file.type)) {
            alert("Este ficheiro não é permitido. Por favor seleciona uma imagem.");
            return false
        } else {
            return true
        }
    };

    const handleChange = tipo => conteudo => {
        if (tipo !== 'imagemUser') {
            valores[tipo] = conteudo.target.value;
            setValores({...valores});
        } else {
            const verificar = verificarFicheiro(conteudo.target.files[0]);
            if (verificar){
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                    setImagem(reader.result);
                }, false);
                reader.readAsDataURL(conteudo.target.files[0]);
                valores[tipo] = conteudo.target.files[0];
                setValores({...valores});
            }
        }
    };

    const onAtualizaUtilizador = (docId, userId, imagemUser, nomeUtilizador, biografia, pais, cidade) => {

        if(imagemUser.name) {
            let date = new Date();
            let timestamp = date.getTime();
            let newName = imagemUser.name + "_imagem_" + timestamp;
            console.log(imagemUser, newName)

            dispatch(atualizaUtilizador(docId, userId, newName, nomeUtilizador, biografia, pais, cidade));

            const uploadTask = storage.ref(`imagensUtilizadores/${newName}`).put(imagemUser);
            uploadTask.on(
            "state_changed",
            snapshot => {
            },
            error => {
                console.log(error);
            });
        } else {
            dispatch(atualizaUtilizador(docId, userId, imagemUser, nomeUtilizador, biografia, pais, cidade));
        }
    }

    useAuthentication()

    console.log(isLoading, isLoadingUser)
    if(isLoading || isLoadingUser) {
        return (
            <Loading />
        )
    }

    return(
        <Fundo>
            <Div>
                <section className="m-0 p-0 w-100">
                    <BackArrow isGoingBack={true} />
                    <label for="imgPerfil" className="imagemPerfil mb-0"><ProfilePicture style={{backgroundImage: `url(${imagem ? imagem : imgPlaceholder})`}}/></label>
                    <input className="form-control" id="imgPerfil" type="file" aria-label="Search" onChange={handleChange('imagemUser')}/>
                </section>
                <section className="row col-12 m-0 p-0 w-100">
                    <span className="col-12 m-0 mb-2 p-0">
                        <span className="nomeForm">Nome<span className="obrigatorio">*</span></span>
                        <input 
                            className="form-control forms mb-3" 
                            type="text" aria-label="name"
                            defaultValue={valores.nomeUtilizador}
                            onChange={handleChange('nomeUtilizador')}/>
                    </span>
                    <span className="col-12 mb-2 m-0 p-0">
                        <span className="nomeForm">Biografia</span>
                        <textarea 
                            className="form-control forms mb-3" 
                            type="text" aria-label="biografia"
                            defaultValue={valores.biografia}
                            onChange={handleChange('biografia')}/>
                    </span>
                    <span className="col-12 mb-2 m-0 p-0">
                        <span className="nomeForm">Pais<span className="obrigatorio">*</span></span>
                        <select 
                            className="form-control forms mb-3" 
                            type="text" aria-label="pais"
                            defaultValue={valores.pais}
                            onChange={handleChange('pais')}
                            placeholder="Selecione um país">
                                <option value="" disabled>Selecione um país</option>
                                <option value="Brasil">Brasil</option>
                                <option value="Afeganistão">Afeganistão</option>
                                <option value="África do Sul">África do Sul</option>
                                <option value="Albânia">Albânia</option>
                                <option value="Alemanha">Alemanha</option>
                                <option value="Andorra">Andorra</option>
                                <option value="Angola">Angola</option>
                                <option value="Anguilla">Anguilla</option>
                                <option value="Antilhas Holandesas">Antilhas Holandesas</option>
                                <option value="Antárctida">Antárctida</option>
                                <option value="Antígua e Barbuda">Antígua e Barbuda</option>
                                <option value="Argentina">Argentina</option>
                                <option value="Argélia">Argélia</option>
                                <option value="Armênia">Armênia</option>
                                <option value="Aruba">Aruba</option>
                                <option value="Arábia Saudita">Arábia Saudita</option>
                                <option value="Austrália">Austrália</option>
                                <option value="Áustria">Áustria</option>
                                <option value="Azerbaijão">Azerbaijão</option>
                                <option value="Bahamas">Bahamas</option>
                                <option value="Bahrein">Bahrein</option>
                                <option value="Bangladesh">Bangladesh</option>
                                <option value="Barbados">Barbados</option>
                                <option value="Belize">Belize</option>
                                <option value="Benim">Benim</option>
                                <option value="Bermudas">Bermudas</option>
                                <option value="Bielorrússia">Bielorrússia</option>
                                <option value="Bolívia">Bolívia</option>
                                <option value="Botswana">Botswana</option>
                                <option value="Brunei">Brunei</option>
                                <option value="Bulgária">Bulgária</option>
                                <option value="Burkina Faso">Burkina Faso</option>
                                <option value="Burundi">Burundi</option>
                                <option value="Butão">Butão</option>
                                <option value="Bélgica">Bélgica</option>
                                <option value="Bósnia e Herzegovina">Bósnia e Herzegovina</option>
                                <option value="Cabo Verde">Cabo Verde</option>
                                <option value="Camarões">Camarões</option>
                                <option value="Camboja">Camboja</option>
                                <option value="Canadá">Canadá</option>
                                <option value="Catar">Catar</option>
                                <option value="Cazaquistão">Cazaquistão</option>
                                <option value="Chade">Chade</option>
                                <option value="Chile">Chile</option>
                                <option value="China">China</option>
                                <option value="Chipre">Chipre</option>
                                <option value="Colômbia">Colômbia</option>
                                <option value="Comores">Comores</option>
                                <option value="Coreia do Norte">Coreia do Norte</option>
                                <option value="Coreia do Sul">Coreia do Sul</option>
                                <option value="Costa do Marfim">Costa do Marfim</option>
                                <option value="Costa Rica">Costa Rica</option>
                                <option value="Croácia">Croácia</option>
                                <option value="Cuba">Cuba</option>
                                <option value="Dinamarca">Dinamarca</option>
                                <option value="Djibouti">Djibouti</option>
                                <option value="Dominica">Dominica</option>
                                <option value="Egito">Egito</option>
                                <option value="El Salvador">El Salvador</option>
                                <option value="Emirados Árabes Unidos">Emirados Árabes Unidos</option>
                                <option value="Equador">Equador</option>
                                <option value="Eritreia">Eritreia</option>
                                <option value="Escócia">Escócia</option>
                                <option value="Eslováquia">Eslováquia</option>
                                <option value="Eslovênia">Eslovênia</option>
                                <option value="Espanha">Espanha</option>
                                <option value="Estados Federados da Micronésia">Estados Federados da Micronésia</option>
                                <option value="Estados Unidos">Estados Unidos</option>
                                <option value="Estônia">Estônia</option>
                                <option value="Etiópia">Etiópia</option>
                                <option value="Fiji">Fiji</option>
                                <option value="Filipinas">Filipinas</option>
                                <option value="Finlândia">Finlândia</option>
                                <option value="França">França</option>
                                <option value="Gabão">Gabão</option>
                                <option value="Gana">Gana</option>
                                <option value="Geórgia">Geórgia</option>
                                <option value="Gibraltar">Gibraltar</option>
                                <option value="Granada">Granada</option>
                                <option value="Gronelândia">Gronelândia</option>
                                <option value="Grécia">Grécia</option>
                                <option value="Guadalupe">Guadalupe</option>
                                <option value="Guam">Guam</option>
                                <option value="Guatemala">Guatemala</option>
                                <option value="Guernesei">Guernesei</option>
                                <option value="Guiana">Guiana</option>
                                <option value="Guiana Francesa">Guiana Francesa</option>
                                <option value="Guiné">Guiné</option>
                                <option value="Guiné Equatorial">Guiné Equatorial</option>
                                <option value="Guiné-Bissau">Guiné-Bissau</option>
                                <option value="Gâmbia">Gâmbia</option>
                                <option value="Haiti">Haiti</option>
                                <option value="Honduras">Honduras</option>
                                <option value="Hong Kong">Hong Kong</option>
                                <option value="Hungria">Hungria</option>
                                <option value="Ilha Bouvet">Ilha Bouvet</option>
                                <option value="Ilha de Man">Ilha de Man</option>
                                <option value="Ilha do Natal">Ilha do Natal</option>
                                <option value="Ilha Heard e Ilhas McDonald">Ilha Heard e Ilhas McDonald</option>
                                <option value="Ilha Norfolk">Ilha Norfolk</option>
                                <option value="Ilhas Cayman">Ilhas Cayman</option>
                                <option value="Ilhas Cocos (Keeling)">Ilhas Cocos (Keeling)</option>
                                <option value="Ilhas Cook">Ilhas Cook</option>
                                <option value="Ilhas Feroé">Ilhas Feroé</option>
                                <option value="Ilhas Geórgia do Sul e Sandwich do Sul">Ilhas Geórgia do Sul e Sandwich do Sul</option>
                                <option value="Ilhas Malvinas">Ilhas Malvinas</option>
                                <option value="Ilhas Marshall">Ilhas Marshall</option>
                                <option value="Ilhas Menores Distantes dos Estados Unidos">Ilhas Menores Distantes dos Estados Unidos</option>
                                <option value="Ilhas Salomão">Ilhas Salomão</option>
                                <option value="Ilhas Virgens Americanas">Ilhas Virgens Americanas</option>
                                <option value="Ilhas Virgens Britânicas">Ilhas Virgens Britânicas</option>
                                <option value="Ilhas Åland">Ilhas Åland</option>
                                <option value="Indonésia">Indonésia</option>
                                <option value="Inglaterra">Inglaterra</option>
                                <option value="Índia">Índia</option>
                                <option value="Iraque">Iraque</option>
                                <option value="Irlanda do Norte">Irlanda do Norte</option>
                                <option value="Irlanda">Irlanda</option>
                                <option value="Irã">Irã</option>
                                <option value="Islândia">Islândia</option>
                                <option value="Israel">Israel</option>
                                <option value="Itália">Itália</option>
                                <option value="Iêmen">Iêmen</option>
                                <option value="Jamaica">Jamaica</option>
                                <option value="Japão">Japão</option>
                                <option value="Jersey">Jersey</option>
                                <option value="Jordânia">Jordânia</option>
                                <option value="Kiribati">Kiribati</option>
                                <option value="Kuwait">Kuwait</option>
                                <option value="Laos">Laos</option>
                                <option value="Lesoto">Lesoto</option>
                                <option value="Letônia">Letônia</option>
                                <option value="Libéria">Libéria</option>
                                <option value="Liechtenstein">Liechtenstein</option>
                                <option value="Lituânia">Lituânia</option>
                                <option value="Luxemburgo">Luxemburgo</option>
                                <option value="Líbano">Líbano</option>
                                <option value="Líbia">Líbia</option>
                                <option value="Macau">Macau</option>
                                <option value="Macedônia">Macedônia</option>
                                <option value="Madagáscar">Madagáscar</option>
                                <option value="Malawi">Malawi</option>
                                <option value="Maldivas">Maldivas</option>
                                <option value="Mali">Mali</option>
                                <option value="Malta">Malta</option>
                                <option value="Malásia">Malásia</option>
                                <option value="Marianas Setentrionais">Marianas Setentrionais</option>
                                <option value="Marrocos">Marrocos</option>
                                <option value="Martinica">Martinica</option>
                                <option value="Mauritânia">Mauritânia</option>
                                <option value="Maurícia">Maurícia</option>
                                <option value="Mayotte">Mayotte</option>
                                <option value="Moldávia">Moldávia</option>
                                <option value="Mongólia">Mongólia</option>
                                <option value="Montenegro">Montenegro</option>
                                <option value="Montserrat">Montserrat</option>
                                <option value="Moçambique">Moçambique</option>
                                <option value="Myanmar">Myanmar</option>
                                <option value="México">México</option>
                                <option value="Mônaco">Mônaco</option>
                                <option value="Namíbia">Namíbia</option>
                                <option value="Nauru">Nauru</option>
                                <option value="Nepal">Nepal</option>
                                <option value="Nicarágua">Nicarágua</option>
                                <option value="Nigéria">Nigéria</option>
                                <option value="Niue">Niue</option>
                                <option value="Noruega">Noruega</option>
                                <option value="Nova Caledônia">Nova Caledônia</option>
                                <option value="Nova Zelândia">Nova Zelândia</option>
                                <option value="Níger">Níger</option>
                                <option value="Omã">Omã</option>
                                <option value="Palau">Palau</option>
                                <option value="Palestina">Palestina</option>
                                <option value="Panamá">Panamá</option>
                                <option value="Papua-Nova Guiné">Papua-Nova Guiné</option>
                                <option value="Paquistão">Paquistão</option>
                                <option value="Paraguai">Paraguai</option>
                                <option value="País de Gales">País de Gales</option>
                                <option value="Países Baixos">Países Baixos</option>
                                <option value="Peru">Peru</option>
                                <option value="Pitcairn">Pitcairn</option>
                                <option value="Polinésia Francesa">Polinésia Francesa</option>
                                <option value="Polônia">Polônia</option>
                                <option value="Porto Rico">Porto Rico</option>
                                <option value="Portugal">Portugal</option>
                                <option value="Quirguistão">Quirguistão</option>
                                <option value="Quênia">Quênia</option>
                                <option value="Reino Unido">Reino Unido</option>
                                <option value="República Centro-Africana">República Centro-Africana</option>
                                <option value="República Checa">República Checa</option>
                                <option value="República Democrática do Congo">República Democrática do Congo</option>
                                <option value="República do Congo">República do Congo</option>
                                <option value="República Dominicana">República Dominicana</option>
                                <option value="Reunião">Reunião</option>
                                <option value="Romênia">Romênia</option>
                                <option value="Ruanda">Ruanda</option>
                                <option value="Rússia">Rússia</option>
                                <option value="Saara Ocidental">Saara Ocidental</option>
                                <option value="Saint Martin">Saint Martin</option>
                                <option value="Saint-Barthélemy">Saint-Barthélemy</option>
                                <option value="Saint-Pierre e Miquelon">Saint-Pierre e Miquelon</option>
                                <option value="Samoa Americana">Samoa Americana</option>
                                <option value="Samoa">Samoa</option>
                                <option value="Santa Helena, Ascensão e Tristão da Cunha">Santa Helena, Ascensão e Tristão da Cunha</option>
                                <option value="Santa Lúcia">Santa Lúcia</option>
                                <option value="Senegal">Senegal</option>
                                <option value="Serra Leoa">Serra Leoa</option>
                                <option value="Seychelles">Seychelles</option>
                                <option value="Singapura">Singapura</option>
                                <option value="Somália">Somália</option>
                                <option value="Sri Lanka">Sri Lanka</option>
                                <option value="Suazilândia">Suazilândia</option>
                                <option value="Sudão">Sudão</option>
                                <option value="Suriname">Suriname</option>
                                <option value="Suécia">Suécia</option>
                                <option value="Suíça">Suíça</option>
                                <option value="Svalbard e Jan Mayen">Svalbard e Jan Mayen</option>
                                <option value="São Cristóvão e Nevis">São Cristóvão e Nevis</option>
                                <option value="São Marino">São Marino</option>
                                <option value="São Tomé e Príncipe">São Tomé e Príncipe</option>
                                <option value="São Vicente e Granadinas">São Vicente e Granadinas</option>
                                <option value="Sérvia">Sérvia</option>
                                <option value="Síria">Síria</option>
                                <option value="Tadjiquistão">Tadjiquistão</option>
                                <option value="Tailândia">Tailândia</option>
                                <option value="Taiwan">Taiwan</option>
                                <option value="Tanzânia">Tanzânia</option>
                                <option value="Terras Austrais e Antárticas Francesas">Terras Austrais e Antárticas Francesas</option>
                                <option value="Território Britânico do Oceano Índico">Território Britânico do Oceano Índico</option>
                                <option value="Timor-Leste">Timor-Leste</option>
                                <option value="Togo">Togo</option>
                                <option value="Tonga">Tonga</option>
                                <option value="Toquelau">Toquelau</option>
                                <option value="Trinidad e Tobago">Trinidad e Tobago</option>
                                <option value="Tunísia">Tunísia</option>
                                <option value="Turcas e Caicos">Turcas e Caicos</option>
                                <option value="Turquemenistão">Turquemenistão</option>
                                <option value="Turquia">Turquia</option>
                                <option value="Tuvalu">Tuvalu</option>
                                <option value="Ucrânia">Ucrânia</option>
                                <option value="Uganda">Uganda</option>
                                <option value="Uruguai">Uruguai</option>
                                <option value="Uzbequistão">Uzbequistão</option>
                                <option value="Vanuatu">Vanuatu</option>
                                <option value="Vaticano">Vaticano</option>
                                <option value="Venezuela">Venezuela</option>
                                <option value="Vietname">Vietname</option>
                                <option value="Wallis e Futuna">Wallis e Futuna</option>
                                <option value="Zimbabwe">Zimbabwe</option>
                                <option value="Zâmbia">Zâmbia</option>
                        </select>
                    </span>
                    <span className="col-12 mb-2 m-0 p-0">
                        <span className="nomeForm">Cidade<span className="obrigatorio">*</span></span>
                        <select 
                            className="form-control forms mb-3" 
                            type="text" aria-label="cidade"
                            defaultValue={valores.cidade}
                            onChange={handleChange('cidade')}
                            placeholder="Selecione um distrito">
                                    <option value="" disabled>Selecione um Distrito</option>
                                    <option value="aveiro">Aveiro</option>
                                    <option value="beja">Beja</option>
                                    <option value="braga">Braga</option>
                                    <option value="braganca">Bragança</option>
                                    <option value="castelo_branco">Castelo Branco</option>
                                    <option value="coimbra">Coimbra</option>

                                    <option value="evora">Évora</option>
                                    <option value="faro">Faro</option>
                                    <option value="guarda">Guarda</option>
                                    <option value="ilha_da_madeira">Ilha da Madeira</option>
                                    <option value="ilha_das_flores">Ilha das Flores</option>
                                    <option value="ilha_porto_santo">Ilha de Porto Santo</option>

                                    <option value="ilha_santa_maria">Ilha de Santa Maria</option>
                                    <option value="ilha_sao_jorge">Ilha de São Jorge</option>
                                    <option value="ilha_sao_miguel">Ilha de São Miguel</option>
                                    <option value="ilha_do_corvo">Ilha do Corvo</option>
                                    <option value="ilha_do_faial">Ilha do Faial</option>

                                    <option value="ilha_do_pico">Ilha do Pico</option>
                                    <option value="ilha_graciosa">Ilha Graciosa</option>
                                    <option value="ilha_terceira">Ilha Terceira</option>
                                    <option value="leiria">Leiria</option>
                                    <option value="lisboa">Lisboa</option>
                                    <option value="portalegre">Portalegre</option>

                                    <option value="porto">Porto</option>
                                    <option value="santarem">Santarém</option>
                                    <option value="setubal">Setúbal</option>
                                    <option value="viana_do_castelo">Viana do Castelo</option>
                                    <option value="vila_real">Vila Real</option>

                                    <option value="viseu">Viseu</option>
                        </select>
                    </span>
                    <span className="col-12 text-center mb-2 m-0 p-0">
                        {
                            valores.nomeUtilizador !== '' && valores.cidade !== '' && valores.pais !== '' ?
                            <button 
                            className="botaoSubmeter mt-4"
                            onClick={() => onAtualizaUtilizador(ownUser.id, user.email, valores.imagemUser, valores.nomeUtilizador, valores.biografia, valores.pais, valores.cidade)} 
                            >Confirmar</button>
                            :
                            <button 
                            className="botaoSubmeterDisabled mt-4"
                            disabled>Confirmar</button>

                        }     
                    </span>
                </section>
            </Div>
        </Fundo>
    )
}

export default EditarUtilizador;