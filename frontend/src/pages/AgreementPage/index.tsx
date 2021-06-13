import React, { useEffect } from 'react';
import './index.scss';
import { Container } from 'react-bootstrap';

const Index = () => {

    useEffect(()=>{
        document.title = 'Soor - Üyelik Sözleşmesi';
        window.scrollTo(0,0);
    }, [])

    return (
        <div className='agreement-page-container pb-4'>
            <h2 className='title text-center py-4'>Üyelik Sözleşmesi</h2>
            <Container>
                <p className='muted my-4'>Sitemize üye olmadan önce aşağıda yer alan sözleşmeyi dikkatlice okuyunuz.</p>
                <h3 className='sub-title mb-2'>1. Sözleşmenin Konusu</h3>
                <p className='text mb-4'>İşbu Sözleşme'nin konusu SOOR'un sahip olduğu internet sitesi www.soorapp.com'dan üyenin faydalanma şartlarının belirlenmesidir.</p>
                <h3 className='sub-title mb-2'>2. Tarafların Hak ve Yükümlülükleri</h3>
                <p className='text mb-1'>Üye, www.soorapp.com internet sitesine üye olurken verdiği kişisel ve diğer sair bilgilerin kanunlar önünde doğru olduğunu, SOOR'un bu bilgilerin gerçeğe aykırılığı nedeniyle uğrayacağı tüm zararları aynen ve derhal tazmin edeceğini beyan ve taahhüt eder.</p>
                <p className='text mb-1'>Üye, SOOR tarafından kendisine verilmiş olan şifreyi başka kişi ya da kuruluşlara veremez, üyenin söz konusu şifreyi kullanma hakkı bizzat kendisine aittir. Bu sebeple doğabilecek tüm sorumluluk ile üçüncü kişiler veya yetkili merciler tarafından SOOR'a karşı ileri sürülebilecek tüm iddia ve taleplere karşı, Soor'un söz konusu izinsiz kullanımdan kaynaklanan her türlü tazminat ve sair talep hakkı saklıdır.</p>
                <p className='text mb-1'>Üye www.soorapp.com internet sitesini kullanırken yasal mevzuat hükümlerine riayet etmeyi ve bunları ihlal etmemeyi baştan kabul ve taahhüt eder. Aksi takdirde, doğacak tüm hukuki ve cezai yükümlülükler tamamen ve münhasıran üyeyi bağlayacaktır.</p>
                <p className='text mb-1'> Üye, www.soorapp.com internet sitesini hiçbir şekilde kamu düzenini bozucu, genel ahlaka aykırı, başkalarını rahatsız ve taciz edici şekilde, yasalara aykırı bir amaç için, başkalarının fikri ve telif haklarına tecavüz edecek şekilde kullanamaz. Ayrıca, üye başkalarının hizmetleri kullanmasını önleyici veya zorlaştırıcı faaliyet (spam, virus, truva atı, vb.) ve işlemlerde bulunamaz.</p>
                <p className='text mb-1'>www.soorapp.com internet sitesinde üyeler tarafından beyan edilen, yazılan, kullanılan fikir ve düşünceler, tamamen üyelerin kendi kişisel görüşleridir ve görüş sahibini bağlar. Bu görüş ve düşüncelerin SOOR ile hiçbir ilgi ve bağlantısı yoktur. SOOR'un üyenin beyan edeceği fikir ve görüşler nedeniyle üçüncü kişilerin uğrayabileceği zararlardan ve üçüncü kişilerin beyan edeceği fikir ve görüşler nedeniyle üyenin uğrayabileceği zararlardan dolayı herhangi bir sorumluluğu bulunmamaktadır.</p>
                <p className='text mb-1'>SOOR'un her zaman tek taraflı olarak gerektiğinde üyenin üyeliğini silme, müşteriye ait dosya, belge ve bilgileri silme hakkı vardır. Üye işbu tasarrufu önceden kabul eder. Bu durumda, SOOR'un hiçbir sorumluluğu yoktur.</p>
                <p className='text mb-1'>SOOR, üye verilerinin yetkisiz kişilerce okunmasından ve üye yazılım ve verilerine gelebilecek zararlardan dolayı sorumlu olmayacaktır. Üye, www.soorapp.com internet sitesinin kullanılmasından dolayı uğrayabileceği herhangi bir zarar yüzünden SOOR'dan tazminat talep etmemeyi peşinen kabul etmiştir.</p>
                <p className='text mb-1'>Üye, diğer internet kullanıcılarının yazılımlarına ve verilerine izinsiz olarak ulaşmamayı veya bunları kullanmamayı kabul etmiştir. Aksi takdirde, bundan doğacak hukuki ve cezai sorumluluklar tamamen üyeye aittir.</p>
                <p className='text mb-4'>SOOR'un her zaman tek taraflı olarak gerektiğinde üyenin üyeliğini silme, müşteriye ait dosya, belge ve bilgileri silme hakkı vardır. Üye işbu tasarrufu önceden kabul eder. Bu durumda, SOOR'un hiçbir sorumluluğu yoktur.</p>
                <h3 className='sub-title mb-2'>3. Sözleşmenin Feshi</h3>
                <p className='text mb-4'>İşbu sözleşme üyenin üyeliğini iptal etmesi veya SOOR tarafından üyeliğinin iptal edilmesine kadar yürürlükte kalacaktır. SOOR, üyenin üyelik sözleşmesinin herhangi bir hükmünü ihlal etmesi durumunda üyenin üyeliğini iptal ederek sözleşmeyi tek taraflı olarak feshedebilecektir.</p>
                <h3 className='sub-title mb-2'>4. Yürürlük</h3>
                <p className='text mb-4'>Üyenin, üyelik kaydı yapması üyenin üyelik sözleşmesinde yer alan tüm maddeleri okuduğu ve üyelik sözleşmesinde yer alan maddeleri kabul ettiği anlamına gelir. İşbu Sözleşme üyenin üye olması anında akdedilmiş ve karşılıklı olarak yürürlülüğe girmiştir.</p>
            </Container>
        </div>
    );
};

export default Index;