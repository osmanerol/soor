import React, { useEffect } from 'react';
import './index.scss';
import { Container } from 'react-bootstrap';

const Index = () => {
    
    useEffect(()=>{
        document.title = 'Soor - Hakkımızda';
        window.scrollTo(0,0);
    }, [])

    return (
        <div className='about-page-container pb-4'>
            <h2 className='title text-center py-4'>Hakkımızda</h2>
            <Container>
                <p className='text my-4'>SOOR uygulamasının temelleri 2020 yılında İstanbul Üniversitesi’nde öğrenim gören iki öğrenci tarafından atılmıştır. Bu uygulama ile öğrenci ve öğretmenler için ortak bir platform oluşturularak, öğrencilerin çözemedikleri sorulara kolayca çözüm bulabileceği bir yer haline gelmesi, soruların görüntülü görüşme ile çözümü anlatılarak soru çözümleri ve konu anlatımlarının daha verimli bir şekilde gerçekleşmesi amaçlanmıştır.</p> 
                <p className='text my-4'>2019 yılında başlayan ve uzun süre dünyayı etkisi alan pandemi yüz yüze eğitimlerin aksamasına neden olmuştur. Bu da uzaktan eğitimin kaliteli ve kolay ulaşılabilir şekilde gerçekleştirilmesinin önemini ve gerekliliğini net bir şekilde göstermektedir. Farklı sebeplerden ötürü yüz yüze eğitimde sıkıntılar yaşayan her öğrenci ve/veya öğretmenin, maddi sıkıntılar sebebiyle özel ders alma veya dershanelere kaydolma imkanı bulunmayan öğrencilerin, bilgilerini paylaşma ve öğrencilerinin geleceğinde bir iz bırakma hevesiyle mezun olan ancak atanamayan veya iş bulamayan öğretmenlerin, internete erişimi bulunan her hanenin eğitime ulaşmasını kolaylaştırmak SOOR uygulamasının geliştirilmesinde ilham kaynağı olan en önemli etkendir</p> 
                <p className='text my-4'>İlköğretim’den Üniversite’ye kadar tüm seviyelerde eğitim imkanı sağlamanın yanı sıra, İngilizce, Almanca, Fransızca gibi yabancı diller için de alternatif bir uygulama olarak ortaya çıkmaktadır. Aramıza katılan yeni öğrenciler ve öğretmenler ile platformumuz genişlemeye devam edecek. Uygulama ise yenilikler ve güncelleştirmeler ile her gün üstüne koyularak geliştirilmeye devam edecektir.    </p>
            </Container>
        </div>
    );
};

export default Index;